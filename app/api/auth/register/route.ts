import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const { data, headers } = await api.post('/auth/register', body);
    const res = NextResponse.json(data);
    const setCookie = headers['set-cookie'];
    if (setCookie) res.headers.set('set-cookie', setCookie.join(', '));
    return res;
  } catch (error: any) {
    return NextResponse.json(error.response?.data, { status: error.response?.status || 500 });
  }
}