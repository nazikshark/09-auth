import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ notes: [] }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Note created", note: body }, { status: 201 });
}