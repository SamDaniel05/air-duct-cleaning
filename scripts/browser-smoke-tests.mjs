import assert from "node:assert/strict";
import { chromium } from "playwright";

const templates = ["architectural", "airflow-lab", "clear-living", "field-notes"];
const viewports = [
  { width: 320, height: 844, label: "small mobile" },
  { width: 390, height: 844, label: "mobile" },
  { width: 768, height: 1024, label: "tablet" },
  { width: 1024, height: 768, label: "small desktop" },
  { width: 1280, height: 800, label: "desktop" },
  { width: 1920, height: 1080, label: "wide desktop" }
];

const browser = await chromium.launch({ headless: true });
try {
  for (const template of templates) {
    const url = `http://127.0.0.1:4178/air-duct-cleaning/${template}/`;
    for (const viewport of viewports) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "no-preference"
      });
      const pageErrors = [];
      page.on("pageerror", error => pageErrors.push(error.message));
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      assert(response && response.ok(), `${template}: page response failed (${response?.status()}) at ${viewport.label}`);
      await page.waitForSelector("#services .service-card", { state: "attached", timeout: 15000 });
      await page.waitForSelector("#process .process-visual img", { state: "attached", timeout: 15000 });
      await page.evaluate(() => {
        document.querySelectorAll("#process .process-visual img").forEach(img => { img.loading = "eager"; });
      });
      await page.waitForFunction(() => {
        const imgs = [...document.querySelectorAll("#process .process-visual img")];
        return imgs.length === 3 && imgs.every(img => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
      }, { timeout: 20000 });

      const dimensions = await page.evaluate(() => {
        const serviceHeading = document.querySelector("#services .services-intro .section-heading h2");
        const serviceCopy = document.querySelector("#services .services-intro .section-heading > p");
        const processCards = [...document.querySelectorAll("#process .process-step")];
        const rect = element => {
          const r = element.getBoundingClientRect();
          return { left: r.left, right: r.right, width: r.width, height: r.height };
        };
        return {
          innerWidth: window.innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          serviceHeading: serviceHeading ? rect(serviceHeading) : null,
          serviceCopy: serviceCopy ? rect(serviceCopy) : null,
          serviceCount: document.querySelectorAll("#services .service-card").length,
          processCards: processCards.length,
          processCardPosition: processCards[0] ? getComputedStyle(processCards[0]).position : null
        };
      });
      assert(
        dimensions.documentWidth <= viewport.width + 1 && dimensions.bodyWidth <= viewport.width + 1,
        `${template}: horizontal overflow at ${viewport.label}: viewport=${viewport.width}, document=${dimensions.documentWidth}, body=${dimensions.bodyWidth}`
      );
      assert.equal(dimensions.serviceCount, 3, `${template}: expected three service cards`);
      assert(dimensions.serviceHeading && dimensions.serviceHeading.width > 0, `${template}: service heading missing at ${viewport.label}`);
      assert(dimensions.serviceCopy && dimensions.serviceCopy.width > 0, `${template}: service description missing at ${viewport.label}`);
      assert(
        dimensions.serviceCopy.width >= (viewport.width < 640 ? viewport.width * 0.65 : 180),
        `${template}: service copy is too narrow at ${viewport.label} (${dimensions.serviceCopy.width}px)`
      );
      assert.equal(dimensions.processCards, 3, `${template}: process stages missing at ${viewport.label}`);
      if (viewport.width <= 1024) {
        assert.equal(dimensions.processCardPosition, "relative", `${template}: process cards should flow naturally at ${viewport.label}`);
      }
      assert.equal(pageErrors.length, 0, `${template}: browser errors at ${viewport.label}: ${pageErrors.join("; ")}`);
      console.log(`PASS ${template} / ${viewport.label}: ${viewport.width}px, images decoded, no horizontal overflow`);
      await page.close();
    }

    const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "no-preference" });
    const pageErrors = [];
    desktop.on("pageerror", error => pageErrors.push(error.message));
    const response = await desktop.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    assert(response && response.ok(), `${template}: desktop animation page failed to load`);
    await desktop.waitForSelector("#process .process-step", { state: "attached" });
    await desktop.evaluate(() => {
      document.querySelectorAll("#process .process-visual img").forEach(img => { img.loading = "eager"; });
    });
    await desktop.waitForFunction(() => [...document.querySelectorAll("#process .process-visual img")].every(img => img.complete && img.naturalWidth > 0));
    const startY = await desktop.locator("#process .process-story").evaluate(el => el.getBoundingClientRect().top + window.scrollY - 105);
    const innerHeight = await desktop.evaluate(() => window.innerHeight);
    const observed = [];
    for (const stageOffset of [0, 0.92, 1.92]) {
      await desktop.evaluate(y => window.scrollTo(0, y), startY + stageOffset * innerHeight * 1.08);
      await desktop.waitForTimeout(350);
      observed.push(await desktop.locator("#process .process-step").evaluateAll(cards => cards.map(card => Number.parseFloat(getComputedStyle(card).opacity))));
    }
    assert(observed[0][0] > 0.75, `${template}: first process stage not visible at animation start`);
    assert(observed[1][1] > 0.55, `${template}: second process stage failed to enter`);
    assert(observed[2][2] > 0.55, `${template}: third process stage failed to enter`);
    assert.equal(pageErrors.length, 0, `${template}: uncaught browser errors: ${pageErrors.join("; ")}`);
    console.log(`PASS ${template}: pinned process sequence transitions through all stages`);
    await desktop.close();
  }
} finally {
  await browser.close();
}
