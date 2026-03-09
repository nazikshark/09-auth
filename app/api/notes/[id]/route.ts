import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ id: "1", title: "Test Note" }, { status: 200 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Note updated", note: body }, { status: 200 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Note deleted" }, { status: 200 });
}