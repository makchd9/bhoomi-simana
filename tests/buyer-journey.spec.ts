import { expect, test } from "@playwright/test";
const base = "http://127.0.0.1:3001";
test("published plans are distinguished from inventory and every plan opens and downloads", async ({
  page,
  request,
}) => {
  await page.goto(`${base}/residences`);
  await expect(page.locator("#residences")).toContainText(
    "not a live inventory",
  );
  for (const [label, number, area] of [
    ["2 BHK Premium", 1, "826"],
    ["3 BHK Smart", 2, "948"],
    ["3 BHK Grand", 3, "1,133"],
    ["4 BHK Superior", 4, "1,674"],
    ["5 BHK Supreme", 5, "2,104"],
  ] as const) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator(".residence-detail")).toContainText(area);
    const download = page.getByRole("link", {
      name: "Download floor plan",
      exact: false,
    });
    await expect(download).toHaveAttribute(
      "href",
      `/images/simana/Floor-plans${number}.jpg`,
    );
    const asset = await request.get(
      `${base}/images/simana/Floor-plans${number}.jpg`,
    );
    expect(asset.ok()).toBe(true);
    await page
      .getByRole("button", { name: "View floor plan", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
      "src",
      `/images/simana/Floor-plans${number}.jpg`,
    );
    await expect(
      page.getByRole("link", { name: /Open original in full screen/ }),
    ).toHaveAttribute("target", "_blank");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "View floor plan", exact: true }),
    ).toBeFocused();
  }
  await page
    .getByRole("link", { name: "Enquire about this residence" })
    .click();
  await expect(page.getByLabel("Configuration", { exact: true })).toHaveValue(
    "5 BHK",
  );
  await expect(page.getByLabel("Enquiry type")).toHaveValue(
    "Request Floor Plan",
  );
});
test("brochure is real, original QR records are available, and unapproved claims stay withheld", async ({
  page,
  request,
}) => {
  const response = await request.get(`${base}/documents/purnata-brochure.pdf`);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await page.goto(`${base}/rera`);
  for (const id of ["P51900033361", "P51900033360", "PR1170002500564"])
    await expect(page.locator(".rera-list")).toContainText(id);
  await expect(page.locator(".rera-list img")).toHaveCount(3);
  await expect(page.locator(".rera-section")).toContainText(
    "differ on the A/B wing mapping",
  );
  await page.goto(base);
  await expect(page.locator("main")).not.toContainText(
    /11\.8|11\.5|61\+|17,000|Amit Mehta|Neha Patel/,
  );
  await expect(page.locator(".buyer-footer")).toContainText("P51900033361");
  await expect(page.locator("#main-tower-title")).toHaveText(
    "A new perspective.",
  );
});
test("six amenity categories contain thirty unique facilities and image labels are explicit", async ({
  page,
}) => {
  await page.goto(`${base}/amenities`);
  await expect(page.locator(".story-tabs button")).toHaveCount(6);
  const facilities = await page
    .locator(".amenity-directory li strong")
    .allTextContents();
  expect(facilities).toHaveLength(30);
  expect(new Set(facilities).size).toBe(30);
  await page
    .getByRole("button", { name: "Family & children", exact: true })
    .click();
  await expect(page.locator(".amenity-caption")).toContainText(
    "A world to grow into.",
  );
  await expect(page.locator(".amenity-stage")).toContainText("Rendered image");
  await page.goto(`${base}/residences`);
  await expect(page.locator(".image-credit")).toContainText("Actual Image");
  await page
    .getByRole("button", { name: "Guest bedroom", exact: true })
    .click();
  await expect(page.locator(".image-credit")).toContainText("Rendered Image");
});
test("enquiry integration fails honestly when unconfigured and validates requests before delivery", async ({
  page,
  request,
}) => {
  await page.goto(`${base}/contact?type=Book%20Site%20Visit`);
  await expect(page.getByLabel("Enquiry type")).toHaveValue("Book Site Visit");
  await expect(
    page.getByRole("button", { name: "Online enquiries coming soon" }),
  ).toBeDisabled();
  await expect(page.locator("#contact")).toContainText(
    "does not send or store your details",
  );
  const headers = { Origin: base };
  const lead = {
    name: "Preview Test",
    phone: "9999999999",
    email: "preview@example.com",
    configuration: "3 BHK",
    enquiryType: "Book Site Visit",
    message: "Automated local integration check",
    callback: "",
    consent: true,
  };
  expect(
    (
      await request.post(`${base}/api/enquiry`, {
        headers,
        data: { ...lead, email: "invalid" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post(`${base}/api/enquiry`, {
        headers,
        data: { ...lead, consent: false },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post(`${base}/api/enquiry`, {
        headers: { Origin: "https://example.com" },
        data: lead,
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post(`${base}/api/enquiry`, { headers, data: lead })
    ).status(),
  ).toBe(503);
  expect(
    (
      await request.post(`${base}/api/enquiry`, {
        headers,
        data: { ...lead, message: "a".repeat(9000) },
      })
    ).status(),
  ).toBe(413);
});
for (const width of [320, 390, 768, 1440])
  test(`buyer pages fit at ${width}px without clipping`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of [
      "/residences",
      "/amenities",
      "/aikyam",
      "/location",
      "/about-bhoomi",
      "/blog",
      "/contact",
      "/rera",
      "/privacy",
      "/disclaimer",
    ]) {
      const response = await page.goto(base + path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBe(true);
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
      ).toBe("https://bhoomi-simana.vercel.app" + path);
    }
    if (width < 768)
      await expect(
        page.getByRole("navigation", { name: "Quick contact" }),
      ).toBeVisible();
    expect(errors).toEqual([]);
  });
test("direct links from the buyer pages reach the correct cinematic room", async ({
  page,
}) => {
  await page.goto(`${base}/aikyam`);
  await page
    .getByRole("link", {
      name: "Enter the clubhouse walkthrough",
      exact: false,
    })
    .click();
  await expect(page.locator("#clubhouse")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect(page.locator("#clubhouse-title")).toBeInViewport();
  await page.getByRole("link", { name: "Skip journey", exact: true }).click();
  await expect(page.locator("#why-simana")).toBeInViewport();
});
test("mobile map loads on request and key content is usable without motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.locator("#location").scrollIntoViewIfNeeded();
  await expect(page.locator("#location iframe")).toHaveCount(0);
  await page.getByRole("button", { name: /Load location map/ }).click();
  await expect(page.locator("#location iframe")).toHaveAttribute(
    "src",
    /google.com\/maps\/embed/,
  );
  await page.locator("#questions").scrollIntoViewIfNeeded();
  await page
    .locator(".faq-list summary")
    .filter({ hasText: "What is the possession timeline?" })
    .click();
  await expect(
    page.getByText(/A verified, current tower-specific possession date/),
  ).toBeVisible();
});
