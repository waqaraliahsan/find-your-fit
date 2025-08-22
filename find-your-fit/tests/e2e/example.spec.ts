import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.locator("text=Find Your Fit")).toBeVisible();
});

test("sign up and apply mentor flow (stub)", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/sign-up");
  await expect(page.locator("text=Create an account")).toBeVisible();
  // further steps would fill form, skipped for brevity
});
