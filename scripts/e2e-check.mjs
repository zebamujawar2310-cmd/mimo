// Live browser validation of the Trimmer Boss™ storefront.
// Run with the production server up on :3100  →  node scripts/e2e-check.mjs
import { chromium } from "playwright";

const BASE = "http://localhost:3100";
const results = [];
let failures = 0;

const ok = (name, pass, extra = "") => {
  if (!pass) failures += 1;
  results.push(`${pass ? "PASS" : "FAIL"} ${name}${extra ? ` — ${extra}` : ""}`);
};

const consoleErrors = [];
const notFounds = [];

// Wires error watchers; resource-load console noise is covered by the 404 audit.
function attach(p) {
  p.on("console", (m) => {
    const t = m.text();
    if (m.type() === "error" && !t.includes("Failed to load resource")) {
      consoleErrors.push(t);
    }
  });
  p.on("pageerror", (e) => consoleErrors.push(String(e)));
  p.on("response", (r) => {
    if (r.status() === 404) notFounds.push(r.url());
  });
}

async function main() {
  const browser = await chromium.launch();

  // ---- Desktop home page: console errors + overflow ----
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();
  attach(page);

  await page.goto(BASE, { waitUntil: "networkidle" });
  ok("home loads", (await page.title()).includes("Trimmer Boss"));
  ok(
    "hero shows live price",
    /6,643/.test(await page.locator("#home").innerText())
  );

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  ok("no horizontal overflow @1440", overflow <= 0, `overflowPx=${overflow}`);

  // ---- Hero CTAs open the right surfaces ----
  await page.getByRole("button", { name: /order now/i }).first().click();
  await page.getByRole("dialog").waitFor({ state: "visible", timeout: 4000 });
  ok("Order Now opens modal", true);
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden", timeout: 4000 });
  ok("Esc closes modal", true);

  // ---- Order flow: bundle math + validation + demo order ----
  await page.getByRole("button", { name: /order now/i }).first().click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await page.getByRole("radio", { name: /save 15%/i }).click();
  const body15 = await page.getByRole("dialog").innerText();
  ok("bundle 2 shows 15% discount", /15%/.test(body15));
  ok("bundle 2 total = 11,293.10", /11,293\.10/.test(body15));
  ok("bundle 2 mentions free shipping", /free worldwide shipping/i.test(body15));
  await page.getByRole("radio", { name: /save 27%/i }).click();
  const body27 = await page.getByRole("dialog").innerText();
  ok("bundle 3 shows 27% discount", /27%/.test(body27));
  ok("bundle 3 total = 14,548.17", /14,548\.17/.test(body27));
  ok("bundle 3 mentions expedited shipping", /expedited shipping/i.test(body27));
  ok("demo disclaimer shown", /no payment is processed/i.test(body27));

  // submit empty -> inline errors
  await page.getByRole("button", { name: /place demo order/i }).click();
  const dialogErr = await page.getByRole("dialog").innerText();
  ok("empty form shows validation errors", /valid email address/i.test(dialogErr));

  // fill valid
  await page.fill("#order-name", "Test Customer");
  await page.fill("#order-email", "test@example.com");
  await page.fill("#order-address", "1 Main Street");
  await page.fill("#order-city", "Springfield");
  await page.fill("#order-country", "USA");
  await page.getByRole("button", { name: /place demo order/i }).click();
  await page.getByText("Demo order created").waitFor({ state: "visible", timeout: 5000 });
  const successText = await page.getByRole("dialog").innerText();
  ok("success shows TB-DEMO id", /TB-DEMO-\d{4}/.test(successText));
  ok("success states no payment taken", /No payment was\s*taken/i.test(successText));

  // track the created order
  await page.getByRole("button", { name: /track this demo order/i }).click();
  await page.getByText(/received \(demo\)/i).waitFor({ state: "visible", timeout: 5000 });
  ok("created order trackable (Received demo)", true);
  await page.keyboard.press("Escape");
  await desktop.close();
  // ---- Track modal: sample + not-found ----
  const trackCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const tp = await trackCtx.newPage();
  attach(tp);
  await tp.goto(BASE, { waitUntil: "networkidle" });

  await tp.getByRole("button", { name: /^track order$/i }).first().click();
  await tp.getByRole("dialog").waitFor({ state: "visible" });
  await tp.fill('input[aria-label="Order ID"]', "TB-DEMO-0001");
  await tp.getByRole("button", { name: /^track$/i }).click();
  await tp.getByText("Sample demo order").waitFor({ state: "visible", timeout: 4000 });
  ok("sample order TB-DEMO-0001 shows milestones", true);
  await tp.fill('input[aria-label="Order ID"]', "NOPE-9999");
  await tp.getByRole("button", { name: /^track$/i }).click();
  await tp.getByText("No demo order found.").waitFor({ state: "visible", timeout: 4000 });
  ok("unknown id shows not-found state", true);
  await tp.keyboard.press("Escape");

  // ---- FAQ accordion ----
  const faqTrigger = tp.getByRole("button", { name: /what is trimmer boss/i });
  await faqTrigger.scrollIntoViewIfNeeded();
  await faqTrigger.click();
  ok("FAQ accordion opens", (await faqTrigger.getAttribute("data-state")) === "open");

  // ---- Contact form ----
  await tp.locator("#contact").scrollIntoViewIfNeeded();
  await tp.getByRole("button", { name: /send message/i }).click();
  ok(
    "contact validation blocks empty submit",
    /valid email address/i.test(await tp.locator("#contact").innerText())
  );
  await tp.fill("#contact-name", "Test");
  await tp.fill("#contact-email", "test@example.com");
  await tp.fill("#contact-message", "Is this compatible with my trimmer?");
  await tp.getByRole("button", { name: /send message/i }).click();
  await tp.getByText("Message captured — demo only").waitFor({ state: "visible", timeout: 4000 });
  ok("contact success states nothing was sent", true);

  ok(
    "product video element present",
    (await tp.locator('video[src="/product-video.mp4"]').count()) === 1
  );
  ok(
    "hero background image loaded",
    await tp.evaluate(() => {
      const img = document.querySelector('img[src="/hero-bg.webp"]');
      return !!img && img.complete && img.naturalWidth > 0;
    })
  );

  // ---- Reviews: submission flow ----
  await tp.locator("#reviews").scrollIntoViewIfNeeded();
  await tp.fill("#review-name", "Verified Buyer");
  await tp.fill("#review-comment", "Cuts through driveway edges beautifully.");
  await tp.getByRole("button", { name: /post review/i }).click();
  await tp
    .getByText("Pending verification")
    .first()
    .waitFor({ state: "visible", timeout: 4000 });
  ok("review submission shows pending-verification badge", true);

  await tp.screenshot({ path: "screenshots/desktop-home.png", fullPage: true });
  await trackCtx.close();

  // ---- Responsive: 320 / 375 / 768 / 1024 overflow + mobile menu ----
  for (const [w, h] of [[320, 720], [375, 812], [768, 1024], [1024, 768]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    attach(p);
    await p.goto(BASE, { waitUntil: "networkidle" });
    const ov = await p.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    ok(`no horizontal overflow @${w}`, ov <= 0, `overflowPx=${ov}`);

    if (w <= 375) {
      const burger = p.getByRole("button", { name: /open menu/i });
      ok(`hamburger visible @${w}`, await burger.isVisible());
      await burger.click();
      const mobileNav = p.getByRole("navigation", { name: "Mobile" });
      await mobileNav.waitFor({ state: "visible", timeout: 3000 });
      await mobileNav.getByRole("link", { name: /benefits/i }).click();
      ok(
        `mobile nav link navigates @${w}`,
        (await p.evaluate(() => location.hash)) === "#benefits"
      );
      await p.screenshot({ path: `screenshots/mobile-${w}-home.png`, fullPage: true });
    }
    await ctx.close();
  }
  await browser.close();

  ok("no console/page errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));
  ok(
    "no 404s anywhere (all assets installed)",
    notFounds.length === 0,
    notFounds.slice(0, 3).join(" | ")
  );

  console.log(results.join("\n"));
  console.log(failures === 0 ? "\nALL E2E CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("E2E crashed:", e);
  console.log(results.join("\n"));
  process.exit(1);
});