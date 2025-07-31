import directusClient from '@/lib/directus';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { APP_SESSION_TOKEN_NAME } from '@/constant';

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        const response = await directusClient.login({ email, password });

        if (response.access_token) {
            (await cookies()).set(APP_SESSION_TOKEN_NAME, response.access_token, {
                sameSite: 'strict',
                path: '/',
                secure: true,
            });
        }
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
