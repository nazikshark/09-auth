import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const response = await api.post('/auth/login', body);
    const res = NextResponse.json(response.data);
    
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      res.headers.set('set-cookie', setCookie.join(', '));
    }
    
    return res;
  } catch (error: any) {
    return NextResponse.json(error.response?.data || { message: 'Error' }, { status: error.response?.status || 500 });
  }
}