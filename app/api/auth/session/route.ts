import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ user: { id: "1", email: "test@test.com" } }, { status: 200 });
}