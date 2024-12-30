import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Retrieve the session token from cookies
  const cookieStore = await cookies();
  const nextAuthSession =
    cookieStore.get('next-auth.session-token')?.value ?? '';

  if (!nextAuthSession) {
    // Return a 404 or an explicit message if the cookie is missing
    return NextResponse.json(
      { error: 'Session token not found' },
      { status: 404 },
    );
  }

  // Return the session token wrapped in an object
  return NextResponse.json(nextAuthSession);
}
