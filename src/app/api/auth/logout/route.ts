import { NextRequest, NextResponse } from 'next/server';
import { APP_SESSION_TOKEN_NAME } from '@/constant';

export async function POST(request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    const response = NextResponse.redirect(url);

    response.cookies.set(APP_SESSION_TOKEN_NAME, '', {});

    return response;
}
