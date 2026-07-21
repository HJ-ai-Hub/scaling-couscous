import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // TODO: wire this up to GajiPay's CRM / transactional email provider.
  // Left as a structured log for now so the endpoint is safe to ship
  // without over-promising a delivery channel that doesn't exist yet.
  console.log("[contact] new enquiry", parsed.data);

  return NextResponse.json({ ok: true });
}
