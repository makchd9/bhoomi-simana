import { test, expect } from "@playwright/test";
const url = "http://127.0.0.1:3001";

test("scroll drives a pinned, reversible four-chapter journey", async ({
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
    "Tower",
    "Podium",
    "Clubhouse",
  ].entries()) {
    await chapters.getByRole("button", { name: new RegExp(label) }).click();
    await expect(
      chapters.getByRole("button", { name: new RegExp(label) }),
    ).toHaveAttribute("aria-current", "step");
    await page.waitForTimeout(1300);
    await expect(page.locator(".journey-copy").nth([1, 4, 5][index])).toHaveCSS(
      "opacity",
      "1",
    );
    await expect(page.locator(".journey-scene").nth([1, 4, 5][index])).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    const top = await root.evaluate((e) => e.getBoundingClientRect().top);
    expect(Math.abs(top)).toBeLessThan(2);
    await page.screenshot({ path: `/private/tmp/tower-scene-${index}.png` });
  }
  await chapters.getByRole("button", { name: /Tower/ }).click();
  await expect(
    chapters.getByRole("button", { name: /Tower/ }),
  ).toHaveAttribute("aria-current", "step");
  await page.getByRole("link", { name: "Skip journey" }).click();
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await expect(page.locator("#why-simana h2")).toBeInViewport();
});

test("touch-sized journey advances and motion preference removes pinning", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url);
  await page.getByRole("link", { name: "Enter the experience" }).click();
  await expect(page.locator("#main-tower")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await page.getByRole("navigation", { name: "Building journey chapters" }).getByRole("button", { name: /Tower/ }).click();
  await expect.poll(async () => page.locator("#main-tower video").evaluate((element: HTMLVideoElement) => element.videoWidth)).toBe(1080);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "/private/tmp/tower-mobile-arrival.png" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".tower-journey")).not.toHaveAttribute(
    "data-enhanced",
    "true",
  );
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const id of ["main-tower", "spaces", "arrival", "inside", "clubhouse", "club-reception", "club-gym", "club-squash", "club-yoga", "club-staircase", "club-banquet"])
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

test("one natural scroll advances a scene and the hero pan respects reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url);
  await expect(page.locator(".tower-journey")).toHaveAttribute("data-enhanced", "true");
  const picture = page.locator("#skyline .journey-image");
  const initial = await picture.evaluate(el => getComputedStyle(el).transform);
  await expect.poll(() => picture.evaluate(el => getComputedStyle(el).transform), { timeout: 6000 }).not.toBe(initial);
  const chapters = page.getByRole("navigation", { name: "Building journey chapters" });
  await expect(chapters.getByRole("button")).toHaveCount(4);
  await page.getByRole("link",{name:"Enter the experience"}).click();
  await expect(page.locator("#main-tower")).toHaveAttribute("aria-hidden","false");
  await page.waitForTimeout(1000);
  await page.mouse.wheel(0,430);
  await expect(page.locator("#arrival")).toHaveAttribute("aria-hidden","false");
  const paused = await picture.evaluate(el=>getComputedStyle(el).transform);
  await page.waitForTimeout(300);
  expect(await picture.evaluate(el=>getComputedStyle(el).transform)).toBe(paused);
  await chapters.getByRole("button",{name:/Overview/}).click();
  await expect(page.locator("#skyline-title")).toBeInViewport();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(picture).toHaveCSS("transform", "none");
});

for (const width of [320, 1440]) {
  test(`vector header marks remain sharp and separated at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url);
    const simana = page.locator(".header-brand-simana img");
    const bhoomi = page.locator(".header-brand-bhoomi img");
    await expect(simana).toHaveAttribute("src", /branding\/simana-light.svg$/);
    await expect(bhoomi).toHaveAttribute("src", /branding\/bhoomi-light.svg$/);
    const left = (await simana.boundingBox())!;
    const right = (await bhoomi.boundingBox())!;
    const menu = (await page.getByRole("button", { name: "Open navigation menu" }).boundingBox())!;
    expect(left.height).toBe(right.height);
    expect(left.x + left.width).toBeLessThan(menu.x);
    expect(menu.x + menu.width).toBeLessThan(right.x);
    await expect(page.locator("#skyline .journey-copy")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: `.21st/previews/header-four-chapters-${width}.png` });
    await page.getByRole("link", { name: "Skip journey" }).click();
    await expect(simana).toHaveAttribute("src", /branding\/simana.svg$/);
    await expect(bhoomi).toHaveAttribute("src", /branding\/bhoomi.svg$/);
  });
}
