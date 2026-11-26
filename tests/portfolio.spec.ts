import { test, expect } from "@playwright/test";
test("homepage and case study", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Shashank/);
  await expect(
    page.getByAltText("Shashank standing with folded arms"),
  ).toBeVisible();
  await page.getByRole("link", { name: "Read case study" }).click();
  await expect(
    page.getByRole("heading", { name: "The prototype" }),
  ).toBeVisible();
});
test("theme and responsive document", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
