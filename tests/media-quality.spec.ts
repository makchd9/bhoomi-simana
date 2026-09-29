import { expect, test } from "@playwright/test";

for (const viewport of [{ width: 1440, height: 900 }, { width: 720, height: 900 }]) {
  test(`high-density media retains native resolution at ${viewport.width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
    const page = await context.newPage();
    const requests: string[] = [];
    page.on("request", request => requests.push(request.url()));
    await page.goto("http://127.0.0.1:3001");
    const hero = page.locator("#skyline img");
    await expect(hero).toHaveAttribute("src", "/images/simana/context/three-towers-side.webp");
    expect(await hero.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1672);
    // The opening is honestly source-limited; don't manufacture a 4K dimension claim.
    await page.getByRole("navigation", { name: "Building journey chapters" }).getByRole("button", { name: /Tower/ }).click();
    const video = page.locator("#main-tower video");
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.videoWidth)).toBe(3840);
    await expect(video).toHaveAttribute("src", /native-v3\/tower.mp4$/);
    const poster = page.locator("#main-tower img");
    await expect.poll(() => poster.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(3840);
    await expect(poster).toHaveAttribute("src", "/images/simana/native-v3/tower.webp");
    expect(requests.some(url => url.includes("_next/image") && url.includes("native-v3"))).toBe(false);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `.21st/previews/native-quality-${viewport.width}-2x.png` });
    await context.close();
  });
}
