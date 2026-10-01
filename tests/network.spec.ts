import { test, expect } from "@playwright/test";
test("buyer navigation and local assets return no server errors", async ({
  page,
}) => {
  const failed: string[] = [];
  page.on("response", (r) => {
    if (r.url().startsWith("http://127.0.0.1:3001") && r.status() >= 400)
      failed.push(`${r.status()} ${r.url()}`);
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/",
    "/residences",
    "/amenities",
    "/about-bhoomi",
    "/contact",
    "/rera",
  ]) {
    await page.goto("http://127.0.0.1:3001" + route);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  expect(failed).toEqual([]);
});
