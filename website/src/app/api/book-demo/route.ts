import { NextResponse } from "next/server";

import { demoSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = demoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // TODO: wire this up to GajiPay's CRM / calendar booking provider.
  console.log("[book-demo] new request", parsed.data);

  return NextResponse.json({ ok: true });
}
