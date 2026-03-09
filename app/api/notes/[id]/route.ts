import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookie = request.headers.get('cookie');
  const { data } = await api.get(`/notes/${id}`, { headers: { Cookie: cookie || '' } });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookie = request.headers.get('cookie');
  const { data } = await api.delete(`/notes/${id}`, { headers: { Cookie: cookie || '' } });
  return NextResponse.json(data);
}