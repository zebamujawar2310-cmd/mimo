/**
 * Growvia visual + interaction smoke test.
 * Run with the production server on localhost:3000:
 *   node scripts/visual-check.mjs
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "screenshots");
const BASE = "http://localhost:3000";
const results = [];

const browser = await chromium.launch();

async function checkOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const offenders = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > docWidth + 2 || r.left < -2) {
        if (el.tagName === "SCRIPT" || el.tagName === "STYLE") return;
        offenders.push(
          `${el.tagName}.${(el.className || "").toString().slice(0, 60)}`
        );
      }
    });
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: docWidth,
      offenders: offenders.slice(0, 5),
    };
  });
  const ok = overflow.scrollWidth <= overflow.clientWidth + 2;
  results.push(
    `${ok ? "PASS" : "FAIL"} overflow [${label}] scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth}` +
      (overflow.offenders.length ? ` offenders: ${overflow.offenders.join(" | ")}` : "")
  );
}

// ---- Desktop ----
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  results.push(`title: ${await page.title()}`);
  await page.screenshot({ path: path.join(OUT, "desktop-home.png"), fullPage: true });
  await checkOverflow(page, "desktop home");

  // Modal opens via CTA
  await page.getByRole("button", { name: "Book a Free Consultation" }).first().click();
  await page.waitForTimeout(500);
  const dialog = page.getByRole("dialog");
  const dialogVisible = await dialog.isVisible().catch(() => false);
  results.push(`${dialogVisible ? "PASS" : "FAIL"} consultation modal opens`);
  await page.screenshot({ path: path.join(OUT, "desktop-modal.png") });

  // Validation: submit empty form inside modal (scoped to dialog — the
  // contact section also renders a form, so page-level selectors would
  // match both).
  await dialog.getByRole("button", { name: "Send Enquiry" }).click();
  await page.waitForTimeout(400);
  const alerts = await page.getByRole("alert").count();
  results.push(
    `${alerts >= 3 ? "PASS" : "FAIL"} form validation shows ${alerts} error messages on empty submit`
  );
  await page.screenshot({ path: path.join(OUT, "desktop-modal-validation.png") });

  // Fill valid values -> demo success notice
  await dialog.locator('input[name="fullName"]').fill("Test User");
  await dialog.locator('input[name="email"]').fill("test@example.com");
  await dialog.locator('select[name="service"]').selectOption("AI Automation");
  await dialog
    .locator('textarea[name="requirements"]')
    .fill("We want to automate our invoice workflow end to end.");
  await dialog.getByRole("button", { name: "Send Enquiry" }).click();
  await page.waitForTimeout(1200);
  const demoNotice = await page
    .getByText("Demo only", { exact: false })
    .first()
    .isVisible()
    .catch(() => false);
  results.push(
    `${demoNotice ? "PASS" : "FAIL"} demo submission success notice shown`
  );
  await page.screenshot({ path: path.join(OUT, "desktop-modal-success.png") });
  await page.close();
}

// ---- Mobile ----
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await checkOverflow(page, "mobile home");
  await page.screenshot({ path: path.join(OUT, "mobile-home.png"), fullPage: true });

  // Mobile menu
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(400);
  const menuVisible = await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .isVisible()
    .catch(() => false);
  results.push(`${menuVisible ? "PASS" : "FAIL"} mobile menu opens`);
  await page.screenshot({ path: path.join(OUT, "mobile-menu.png") });

  // Portfolio filtering
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Branding" }).click();
  await page.waitForTimeout(300);
  const cards = await page
    .locator('#portfolio ul li a[href^="/case-studies/"]')
    .count();
  results.push(`${cards === 1 ? "PASS" : "FAIL"} portfolio filter -> ${cards} card(s)`);
  await page.close();
}

// ---- Case study + 404 ----
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/case-studies/sample-invoice-automation`, {
    waitUntil: "networkidle",
  });
  await page.screenshot({ path: path.join(OUT, "case-study.png"), fullPage: true });
  await checkOverflow(page, "case study");
  const sampleBadge = await page
    .getByText("Sample Project")
    .first()
    .isVisible()
    .catch(() => false);
  results.push(`${sampleBadge ? "PASS" : "FAIL"} case study shows sample badge`);

  const nf = await page.goto(`${BASE}/missing-page`, { waitUntil: "networkidle" });
  results.push(`${nf.status() === 404 ? "PASS" : "FAIL"} unknown route -> ${nf.status()}`);
  await page.close();
}

await browser.close();

console.log(results.join("\n"));
const failed = results.filter((r) => r.startsWith("FAIL"));
console.log(failed.length === 0 ? "\nALL CHECKS PASSED" : `\n${failed.length} CHECK(S) FAILED`);
