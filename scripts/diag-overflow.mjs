// One-off diagnostic: which elements overflow horizontally at 320px?
import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 320, height: 720 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });

const offenders = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.width > vw + 1) {
      out.push(
        `${el.tagName}#${el.id} w=${Math.round(r.width)} right=${Math.round(r.right)} text="${(el.textContent || "").trim().slice(0, 40)}" parent=${el.parentElement?.tagName}.${String(el.parentElement?.className || "").slice(0, 50)}`
      );
    }
  }
  return out.slice(0, 25);
});
console.log("VIEWPORT=320");
console.log(offenders.join("\n") || "none");

await browser.close();
