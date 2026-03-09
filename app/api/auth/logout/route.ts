import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';

export async function POST(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie');
    const { data, headers } = await api.post('/auth/logout', {}, {
      headers: { Cookie: cookie || '' }
    });
    const res = NextResponse.json(data);
    const setCookie = headers['set-cookie'];
    if (setCookie) res.headers.set('set-cookie', setCookie.join(', '));
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}