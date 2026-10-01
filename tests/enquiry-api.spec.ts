import { test, expect } from "@playwright/test";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/enquiry/route";
const lead = {
  name: "Local Test",
  phone: "+91 99999 99999",
  email: "local-test@example.com",
  configuration: "3 BHK",
  enquiryType: "Request Pricing",
  message: "Local isolated test; no external delivery",
  callback: "",
  consent: true,
};
function request() {
  return new NextRequest("https://preview.example.com/api/enquiry", {
    method: "POST",
    headers: {
      Origin: "https://preview.example.com",
      Host: "preview.example.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });
}
test("configured lead delivery reports success only after the destination accepts it", async () => {
  const oldEndpoint = process.env.LEAD_WEBHOOK_URL,
    oldFetch = globalThis.fetch;
  process.env.LEAD_WEBHOOK_URL = "https://integration.example.com/leads";
  let delivered: Record<string, unknown> | undefined;
  try {
    globalThis.fetch = async (_url, init) => {
      delivered = JSON.parse(String(init?.body));
      return new Response("{}", { status: 202 });
    };
    const accepted = await POST(request());
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toEqual({ ok: true });
    expect(delivered).toMatchObject({ ...lead, project: "Simāna" });
    expect(typeof delivered?.consentedAt).toBe("string");
    globalThis.fetch = async () => new Response("{}", { status: 500 });
    const rejected = await POST(request());
    expect(rejected.status).toBe(502);
    expect(await rejected.json()).not.toHaveProperty("ok", true);
    globalThis.fetch = async () => {
      throw new Error("Timeout in isolated test");
    };
    expect((await POST(request())).status).toBe(502);
  } finally {
    globalThis.fetch = oldFetch;
    if (oldEndpoint === undefined) delete process.env.LEAD_WEBHOOK_URL;
    else process.env.LEAD_WEBHOOK_URL = oldEndpoint;
  }
});
