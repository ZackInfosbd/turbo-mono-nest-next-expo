import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  const getCookies = await cookies();

  return NextResponse.redirect('/auth/sign-up');
}
