import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.API_TOKEN;

export const adminMiddleware = (request: NextRequest, callback: () => Promise<NextResponse<unknown>>) => {
  const token = request.headers.get('x-api-token');

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  const [_, _token] = token.split(' ');

  if (_token !== TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return callback();
}