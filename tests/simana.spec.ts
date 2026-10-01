import { expect, test } from "@playwright/test";
const base = "http://127.0.0.1:3001";

test("three-tower opening and supplied film posters without a master video download", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await expect(page.locator("#skyline")).not.toContainText(
    /43|53|58|Three residential|Concept visualisation/,
  );
  expect(requests.some((url) => /\.mp4/.test(url))).toBe(false);
  for (const registration of [
    "P51900033361",
    "P51900033360",
    "PR1170002500564",
  ])
    await expect(
      page.getByRole("link", { name: new RegExp(registration) }),
    ).toHaveCount(1);
  await expect(page.locator("video[src]")).toHaveCount(0);
  for (const section of [
    "residences",
    "location",
    "contact",
  ]) {
    await page.locator(`#${section}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `/private/tmp/simana-${section}-desktop.png`,
    });
  }
  await expect(page.locator("#project")).toContainText("Premium residential towers");
  expect(requests.filter(url => /\.mp4/.test(url)).every(url => url.includes("/videos/simana/native-v3/"))).toBe(true);
});
