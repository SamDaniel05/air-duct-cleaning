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
const failures = [];
try {
  for (const template of templates) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "no-preference" });
    const pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    const url = `http://127.0.0.1:4178/air-duct-cleaning/${template}/`;
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    assert(response && response.ok(), `${template}: page response failed (${response?.status()})`);
    await page.waitForSelector("#services .service-card", { timeout: 15000 });
    await page.waitForSelector("#process .process-visual img", { timeout: 15000 });

    // Force the lazy process photos to be requested, then verify the browser decoded all three.
    await page.evaluate(() => {
      document.querySelectorAll("#process .process-visual img").forEach((img) => {
        img.loading = "eager";
      });
    });
    await page.waitForFunction(() => {
      const imgs = [...document.querySelectorAll("#process .process-visual img")];
      return imgs.length === 3 && imgs.every(img => img.complete && img.naturalWidth > 0);
    }, { timeout: 20000 });

    const serviceCount = await page.locator("#services .service-card").count();
    assert.equal(serviceCount, 3, `${template}: expected three service cards`);
    const processImageStatus = await page.locator("#process .process-visual img").evaluateAll(imgs =>
      imgs.map(img => ({ src: img.currentSrc, width: img.naturalWidth, height: img.naturalHeight }))
    );
    assert.equal(processImageStatus.length, 3, `${template}: expected three process photos`);
    assert(processImageStatus.every(image => image.width > 0 && image.height > 0), `${template}: a process photo failed to load`);

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(120);
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
          processCards: processCards.length,
          processCardPosition: processCards[0] ? getComputedStyle(processCards[0]).position : null
        };
      });
      assert(
        dimensions.documentWidth <= viewport.width + 1 && dimensions.bodyWidth <= viewport.width + 1,
        `${template}: horizontal overflow at ${viewport.label}: viewport=${viewport.width}, document=${dimensions.documentWidth}, body=${dimensions.bodyWidth}`
      );
      assert(dimensions.serviceHeading && dimensions.serviceHeading.width > 0, `${template}: service heading is missing at ${viewport.label}`);
      assert(dimensions.serviceCopy && dimensions.serviceCopy.width > 0, `${template}: service description is missing at ${viewport.label}`);
      assert.equal(dimensions.processCards, 3, `${template}: process stages missing at ${viewport.label}`);
      if (viewport.width <= 1024) {
        assert.equal(dimensions.processCardPosition, "relative", `${template}: process cards should stack naturally at ${viewport.label}`);
      }
      console.log(`PASS ${template} / ${viewport.label}: ${viewport.width}px wide, no horizontal overflow`);
    }

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(180);
    const processStoryTop = await page.locator("#process .process-story").evaluate(el => el.getBoundingClientRect().top + window.scrollY - 105);
    const stageProgress = [];
    for (const stage of [0, 0.92, 1.92]) {
      await page.evaluate(y => window.scrollTo(0, y), processStoryTop + stage * 800 * 1.08);
      await page.waitForTimeout(350);
      const opacity = await page.locator("#process .process-step").evaluateAll(cards => cards.map(card => Number.parseFloat(getComputedStyle(card).opacity)));
      stageProgress.push(opacity);
    }
    assert(stageProgress[0][0] > 0.75, `${template}: first process stage did not appear initially`);
    assert(stageProgress[1][1] > 0.55, `${template}: second process stage did not transition into view`);
    assert(stageProgress[2][2] > 0.55, `${template}: third process stage did not transition into view`);
    assert.equal(pageErrors.length, 0, `${template}: uncaught browser errors: ${pageErrors.join("; ")}`);
    console.log(`PASS ${template}: process images decoded, all three stages transition, no uncaught browser errors`);
    await page.close();
  }
} finally {
  await browser.close();
}
