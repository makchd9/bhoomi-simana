import { NextRequest, NextResponse } from "next/server";
import { validateLead } from "@/lib/enquiry";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const respond = (error: string, status: number) =>
    NextResponse.json({ error }, { status });
  // Next may normalize its internal hostname; compare the browser origin to
  // the public Host header instead of localhost-normalized request.nextUrl.
  try {
    const origin = new URL(request.headers.get("origin") || "");
    if (
      !["http:", "https:"].includes(origin.protocol) ||
      origin.host !== request.headers.get("host")
    )
      return respond("Request origin is not permitted.", 403);
  } catch {
    return respond("Request origin is not permitted.", 403);
  }
  // Cap the actual stream, not just the optional Content-Length header.
  const reader = request.body?.getReader();
  if (!reader) return respond("Please complete the enquiry form.", 400);
  let raw = "",
    bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 8192) {
        await reader.cancel();
        return respond("Your message is too long.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return respond("The request could not be read.", 400);
  }
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return respond("Please complete the enquiry form.", 400);
  }
  if (value && typeof value === "object" && "website" in value && value.website)
    return respond(
      "Your enquiry could not be sent. Please contact sales directly.",
      400,
    );
  const lead = validateLead(value);
  if (!lead)
    return respond("Please check the required fields and consent.", 400);
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint)
    return respond(
      "Online enquiries are not enabled yet. Please call, WhatsApp or use the official booking page.",
      503,
    );
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:")
      throw new Error("Invalid integration configuration");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...lead,
        project: "Simāna",
        source: "website",
        consentedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery rejected");
    return NextResponse.json({ ok: true });
  } catch {
    return respond(
      "Your enquiry could not be confirmed. Please call or WhatsApp the sales team.",
      502,
    );
  }
}
