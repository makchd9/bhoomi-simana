import { expect, test } from "@playwright/test";
const base = "http://127.0.0.1:3001";

test("unconfirmed inventory stays withheld and map and enquiry remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  const posts: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.goto(base);
  await expect(page.locator("#residences")).toContainText("awaiting confirmation");
  await expect(page.getByRole("button", { name: /BHK/ })).toHaveCount(0);
  await page.locator("#location").scrollIntoViewIfNeeded();
  await expect(page.locator("#location iframe")).toHaveCount(0);
  await page.getByRole("button", { name: /Load location map/ }).click();
  await expect(page.locator("#location iframe")).toHaveAttribute(
    "src",
    /google.com\/maps\/embed/,
  );
  await page.locator("#residences").scrollIntoViewIfNeeded();
  await page
    .getByRole("link", { name: "Request residence details" })
    .click();
  await expect(page.getByLabel("Preferred configuration")).toHaveValue("");
  await page.getByLabel("Name", { exact: true }).fill("Preview Test");
  await page.getByLabel("Phone", { exact: true }).fill("1234567890");
  await page.getByLabel("Email", { exact: true }).fill("preview@example.com");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Please share the published details.");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveAttribute("href", /^mailto:sales@simana-bhoomi.com/);
  await page.getByLabel("Name", { exact: true }).fill("Changed preview");
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveCount(0);
  await page.screenshot({ path: "/private/tmp/simana-contact-mobile.png" });
  expect(posts).toEqual([]);
  expect(errors).toEqual([]);
});

test("single tower scope and supplied film posters without a master video download", async ({
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
    ).toHaveCount(0);
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
  await expect(page.locator("#project")).toContainText("58 floors");
  expect(requests.filter(url => /\.mp4/.test(url)).every(url => url.includes("/videos/simana/hd-v2/"))).toBe(true);
});
