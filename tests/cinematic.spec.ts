import { test, expect } from "@playwright/test";

test("scroll scrubs HD video frames forward and backward, then releases on reduced motion", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:3001");
  await page.getByRole("button", { name: /02 Tower/ }).click();
  const video = page.locator("#main-tower video");
  await expect(video).toHaveAttribute("data-frame", /\d+/);
  expect(await video.evaluate((element: HTMLVideoElement) => element.videoWidth)).toBe(3840);
  await page.waitForTimeout(700);
  const first = Number(await video.getAttribute("data-frame"));
  const anchor = await page.evaluate(() => scrollY);
  await page.evaluate(() => window.scrollBy(0, 120));
  await expect
    .poll(async () => Number(await video.getAttribute("data-frame")))
    .toBeGreaterThan(first + 5);
  await page.evaluate((y) => window.scrollTo(0, y), anchor);
  await expect
    .poll(async () => Number(await video.getAttribute("data-frame")))
    .toBeLessThan(first + 3);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(video).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("reduced-motion visitors do not download HD animation clips", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const frameRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/videos/simana/native-v3/"))
      frameRequests.push(request.url());
  });
  await page.goto("http://127.0.0.1:3001");
  await page.locator("#inside").scrollIntoViewIfNeeded();
  await expect(page.locator("#inside-title")).toBeVisible();
  expect(frameRequests).toEqual([]);
});

test("mobile journey text and controls fit their full-screen overlay", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("http://127.0.0.1:3001");
  for (const label of ["Overview", "Tower", "Podium", "Clubhouse"]) {
    await page
      .getByRole("navigation", { name: "Building journey chapters" })
      .getByRole("button", { name: new RegExp(label) })
      .click();
    await page.waitForTimeout(650);
    const active = page.locator('.journey-scene[aria-hidden="false"]');
    const last = await active.locator(".journey-next").last().boundingBox();
    const chapters = await page.locator(".journey-chapters").boundingBox();
    expect(last!.y + last!.height).toBeLessThan(chapters!.y);
    expect(
      await active
        .locator(".journey-description")
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(13);
  }
});

test("stopping at a scene boundary leaves one readable room, including after resize", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:3001");
  const nav = page.getByRole("navigation", { name: "Building journey chapters" });
  await nav.getByRole("button", { name: /Clubhouse/ }).click();
  await page.getByRole("navigation", { name: "Clubhouse spaces" }).getByRole("button", { name: "Gym", exact: true }).click();
    await expect(page.locator("#club-gym")).toHaveAttribute("aria-hidden", "false");
  await page.waitForTimeout(1200);
  // A breakpoint change can place the playhead inside an image transition.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(900);
  const active = page.locator('.journey-scene[aria-hidden="false"]');
  await expect(active).toHaveCSS("opacity", "1");
  await expect(active.locator(".journey-copy")).toHaveCSS("opacity", "1");
  expect(await page.locator(".journey-scene").evaluateAll(scenes => scenes.filter(scene => getComputedStyle(scene).visibility === "visible").length)).toBe(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  for (const scene of await page.locator(".journey-scene").all()) {
    await expect(scene).toHaveCSS("opacity", "1");
    await expect(scene.locator(".journey-copy")).toHaveCSS("opacity", "1");
  }
});

test("a burst of scrolling is presented in small frame steps and settles on target", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:3001");
  await page.getByRole("button", { name: /02 Tower/ }).click();
  const video = page.locator("#main-tower video");
  await expect(video).toHaveAttribute("data-frame", /\d+/);
  await page.waitForTimeout(1200);
  await video.evaluate((element: HTMLVideoElement) => {
    element.dataset.seekSteps = JSON.stringify([Math.round(element.currentTime * 30)]);
    element.addEventListener("seeking", () => {
      const frames: number[] = JSON.parse(element.dataset.seekSteps ?? "[]");
      frames.push(Math.round(element.currentTime * 30));
      element.dataset.seekSteps = JSON.stringify(frames);
    });
  });
  await page.mouse.wheel(0, 150);
  await page.waitForTimeout(1500);
  await expect.poll(async () => Math.abs(Number(await video.getAttribute("data-frame")) - Number(await video.getAttribute("data-target-frame")))).toBeLessThanOrEqual(1);
  const frames: number[] = JSON.parse((await video.getAttribute("data-seek-steps"))!);
  expect(frames.length).toBeGreaterThan(10);
  expect(Math.max(...frames.slice(1).map((frame, i) => Math.abs(frame - frames[i])))).toBeLessThanOrEqual(2);
  await page.mouse.wheel(0, -150);
  await page.waitForTimeout(1500);
  await expect.poll(async () => Math.abs(Number(await video.getAttribute("data-frame")) - Number(await video.getAttribute("data-target-frame")))).toBeLessThanOrEqual(1);
});
