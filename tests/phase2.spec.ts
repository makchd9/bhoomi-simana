import { test, expect } from "@playwright/test";

const url = "http://127.0.0.1:3001";

test("desktop cinematic scroll and navigation states", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(url);
  await expect(page.locator("#skyline-title")).toBeVisible();
  await page.waitForTimeout(2500);
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-theme",
    "light",
  );
  await page.screenshot({ path: "/private/tmp/phase2-desktop.png" });
  await page.getByRole("link", { name: "Begin the journey" }).click();
  await expect(page.locator("#main-tower video")).toHaveAttribute("data-frame", /\d+/);
  await page.getByRole("link", { name: "Skip journey" }).click();
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await page.waitForTimeout(1800);
  await page.screenshot({ path: "/private/tmp/phase2-intro.png" });
  await page.getByRole("link", { name: "Private presentation", exact: false }).first().click();
  await expect(page.locator("#contact-title")).toBeInViewport();
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1024, 1920]) {
  test(`layout and menu at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(url);
    await page.waitForTimeout(2200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    if (width <= 1920) {
      if (width === 390)
        await page.screenshot({ path: "/private/tmp/phase2-mobile.png" });
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await expect(page.locator("#navigation-dialog")).toBeVisible();
      await page.waitForTimeout(700);
      expect(
        await page
          .getByRole("dialog")
          .evaluate((e) => e.scrollWidth <= e.clientWidth),
      ).toBeTruthy();
      if (width === 390)
        await page.screenshot({ path: "/private/tmp/phase2-menu.png" });
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press("Tab");
        expect(
          await page.evaluate(() =>
            document.querySelector("dialog")?.contains(document.activeElement),
          ),
        ).toBeTruthy();
      }
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation menu" }),
      ).toBeFocused();
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page
        .getByRole("navigation", { name: "Expanded navigation" })
        .getByRole("link", { name: "Tower", exact: true })
        .click();
      await expect(page.locator("#navigation-dialog")).not.toBeVisible();
      await expect(page.locator("#main-tower")).toHaveAttribute("aria-hidden", "false");
      await page.waitForTimeout(2000);
      if (width === 390)
        await page.screenshot({ path: "/private/tmp/phase2-mobile-intro.png" });
    }
  });
}

test("reduced motion keeps content static and menu can reopen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  expect(
    await page
      .locator(".journey-scene-0 .journey-picture")
      .evaluate((e) => getComputedStyle(e).transform),
  ).toBe("none");
  await page.getByRole("link", { name: "Discover the project" }).click();
  await expect(page).toHaveURL(/#project$/);
  expect(
    await page
      .locator(".journey-scene-0 .journey-picture")
      .evaluate((e) => getComputedStyle(e).transform),
  ).toBe("none");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.locator("#navigation-dialog")).toHaveCSS("opacity", "1");
});

test("server content remains visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(url);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#project-title")).toBeVisible();
  await expect(page.getByText("To be announced", { exact: true })).toHaveCount(
    0,
  );
  await expect(
    page.getByText("Purnata · 58 floors", { exact: true }),
  ).toBeVisible();
  await context.close();
});
