import { test, expect } from "@playwright/test";
test("render and contact form", async ({ page }, info) => {
  await page.goto("/");
  await page
    .getByRole("heading", { name: /Featured work/ })
    .scrollIntoViewIfNeeded();
  const metrics = await page.evaluate(() => ({
    width: innerWidth,
    overflow: document.documentElement.scrollWidth - innerWidth,
    paint: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
  }));
  console.log("AUDIT", info.project.name, JSON.stringify(metrics));
  await page.getByLabel("Full name").fill("Local quality check");
  await page.getByLabel("Email", { exact: true }).fill("test@example.org");
  await page.getByLabel("Subject").fill("Local test");
  await page.getByLabel("Message", { exact: true }).fill("Preview QA only");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("has been saved");
});
