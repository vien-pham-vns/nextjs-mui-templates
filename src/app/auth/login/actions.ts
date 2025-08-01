'use server';

import { APP_SESSION_TOKEN_NAME } from '@/constant';
import { cookies } from 'next/headers';

export async function clearExpiredCookie() {
    (await cookies()).set(APP_SESSION_TOKEN_NAME, '', {
        expires: new Date(0),
        path: '/',
    });
}
