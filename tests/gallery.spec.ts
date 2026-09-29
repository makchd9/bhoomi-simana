import { test, expect } from "@playwright/test";
const url = "http://127.0.0.1:3001";

for (const width of [320, 1440]) {
  test(`clubhouse rooms belong to their confirmed floor at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(url);
    await expect(page.locator(".context-towers, .building-hotspot")).toHaveCount(0);
    const nav = page.getByRole("navigation", { name: "Building journey chapters" });
    await nav.getByRole("button", { name: /Ground floor/ }).click();
    await expect(page.locator("#club-gym")).toHaveAttribute("aria-hidden", "false");
    const rooms = page.getByRole("navigation", { name: "Ground floor spaces" });
    await rooms.getByRole("button", { name: "Squash court", exact: true }).click();
    await expect(page.locator("#club-squash")).toHaveAttribute("aria-hidden", "false");
    await expect(page.locator("#club-squash")).toContainText("double-height squash court");
    await expect(page.locator("#club-squash video")).toHaveAttribute("data-frame", /\d+/);
    await rooms.getByRole("button", { name: "Yoga room", exact: true }).click();
    await expect(page.locator("#club-yoga")).toHaveAttribute("aria-hidden", "false");
    await page.waitForTimeout(1100);
    const controls = await rooms.boundingBox();
    const rail = await nav.boundingBox();
    expect(controls!.y + controls!.height).toBeLessThan(rail!.y);
    if (width < 768) {
      await expect(page.locator("#club-yoga video")).toHaveCSS("object-fit", "contain");
      await expect.poll(() => page.locator("#club-yoga video").evaluate((v: HTMLVideoElement) => v.videoWidth)).toBe(1920);
    }
    await page.mouse.wheel(0, 1250);
    await expect(page.locator("#club-staircase")).toHaveAttribute("aria-hidden", "false");
    await page.getByRole("navigation", { name: "First floor spaces" }).getByRole("button", { name: "Banquet hall" }).click();
    await expect(page.locator("#club-banquet")).toHaveAttribute("aria-hidden", "false");
    await expect(page.locator("#club-banquet")).toContainText("First floor");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `.21st/previews/clubhouse-banquet-${width}.png` });
    expect(errors).toEqual([]);
  });
}

test("Amenities menu reaches the podium without cinematic motion", async ({ page }) => {
  await page.setViewportSize({ width: 740, height: 500 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url);
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.getByRole("navigation", { name: "Expanded navigation" }).getByRole("link", { name: "Amenities", exact: true }).click();
  await expect(page.locator("#spaces-title")).toBeInViewport();
  await expect(page.locator("#spaces")).toContainText("swimming pool, clubhouse");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("chapter selection glides through intermediate positions and supports keyboard controls", async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto(url);
  const nav=page.getByRole("navigation",{name:"Building journey chapters"});
  await expect(page.locator(".tower-journey")).toHaveAttribute("data-enhanced","true");
  await nav.getByRole("button",{name:/First floor/}).click();
  await page.waitForTimeout(180);
  const intermediate = await page.evaluate(()=>scrollY);
  await expect(nav.getByRole("button",{name:/First floor/})).toHaveAttribute("aria-current","step");
  await page.waitForTimeout(1100);
  const final = await page.evaluate(()=>scrollY);
  expect(intermediate).toBeGreaterThan(0);
  expect(final).toBeGreaterThan(intermediate+100);
  await page.keyboard.press("Home");
  await expect(nav.getByRole("button",{name:/Overview/})).toBeFocused();
  await expect(nav.getByRole("button",{name:/Overview/})).toHaveAttribute("aria-current","step");
});
