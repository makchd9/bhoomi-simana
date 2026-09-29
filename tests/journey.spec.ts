import { test, expect } from "@playwright/test";
const url = "http://127.0.0.1:3001";

test("scroll drives a pinned, reversible six-chapter journey", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(url);
  const root = page.locator(".tower-journey");
  await expect(root).toHaveAttribute("data-enhanced", "true");
  const chapters = page.getByRole("navigation", {
    name: "Building journey chapters",
  });
  for (const [index, label] of [
    "Overview",
    "Main tower",
    "Podium",
    "Clubhouse",
    "Ground floor",
    "First floor",
  ].entries()) {
    await chapters.getByRole("button", { name: new RegExp(label) }).click();
    await expect(
      chapters.getByRole("button", { name: new RegExp(label) }),
    ).toHaveAttribute("aria-current", "step");
    await page.waitForTimeout(1300);
    await expect(page.locator(".journey-copy").nth([0, 1, 4, 5, 7, 10][index])).toHaveCSS(
      "opacity",
      "1",
    );
    await expect(page.locator(".journey-scene").nth([0, 1, 4, 5, 7, 10][index])).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    const top = await root.evaluate((e) => e.getBoundingClientRect().top);
    expect(Math.abs(top)).toBeLessThan(2);
    await page.screenshot({ path: `/private/tmp/tower-scene-${index}.png` });
  }
  await chapters.getByRole("button", { name: /Main tower/ }).click();
  await expect(
    chapters.getByRole("button", { name: /Main tower/ }),
  ).toHaveAttribute("aria-current", "step");
  await page.getByRole("link", { name: "Skip journey" }).click();
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await expect(page.locator("#project-title")).toBeInViewport();
});

test("touch-sized journey advances and motion preference removes pinning", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url);
  await page.getByRole("link", { name: "Begin the journey" }).click();
  await expect(page.locator("#main-tower")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await page.getByRole("navigation", { name: "Building journey chapters" }).getByRole("button", { name: /Main tower/ }).click();
  await expect.poll(async () => page.locator("#main-tower video").evaluate((element: HTMLVideoElement) => element.videoWidth)).toBe(1080);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "/private/tmp/tower-mobile-arrival.png" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".tower-journey")).not.toHaveAttribute(
    "data-enhanced",
    "true",
  );
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const id of ["skyline", "main-tower", "spaces", "arrival", "inside", "clubhouse", "club-reception", "club-gym", "club-squash", "club-yoga", "club-staircase", "club-banquet"])
    await expect(page.locator("#" + id)).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
