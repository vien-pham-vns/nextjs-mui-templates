import 'server-only';

import directusClient from './directus';
import { DirectusUser, readMe } from '@directus/sdk';
import { APP_SESSION_TOKEN_NAME } from '@/constant';
import { cookies } from 'next/headers';
import { verifyToken } from './session';

/**
 * Always use getUser() to protect pages and user data.
 * Never trust cookie exists inside header. It isn't guaranteed to revalidate the Auth token.
 * It's safe to trust getUser() because it sends a request to the Directus Auth server every time to revalidate the Auth token.
 *
 * Docs: https://nextjs.org/blog/security-nextjs-server-components-actions
 */
export async function getUser() {
    const sessionCookies = (await cookies()).get(APP_SESSION_TOKEN_NAME);
    if (!sessionCookies || !sessionCookies.value) {
        return null;
    }

    const sessionData = await verifyToken(sessionCookies.value);

    if (!sessionData.token || typeof sessionData.token !== 'string') {
        return null;
    }

    if (new Date(sessionData.expires) < new Date()) {
        return null;
    }

    try {
        directusClient.setToken(sessionData.token);
        const user = await directusClient.request(readMe());
        if (!user?.id) {
            return null;
        }

        return user as DirectusUser;
    } catch {
        // if ((error as any).response && (error as any).response.status === 401) {
        //     // redirect('/auth/login?token=EXPIRED');
        //     const result = await directusClient.request(refresh({ mode: 'cookie' }));
        //     console.log('result', result);
        //     if (result.access_token) {
        //         redirect('/auth/login?token=EXPIRED');
        //     }
        // }
        throw new Error('Failed to fetch user data');
    }
}

export async function getSessionCookie(): Promise<string | null> {
    const cookieData = (await cookies()).get(APP_SESSION_TOKEN_NAME)?.value;
    if (!cookieData) return null;
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(cookieData);
        }, 1000),
    );
}
