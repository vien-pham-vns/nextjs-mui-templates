import 'server-only';

import directusClient from './directus';
import { readMe } from '@directus/sdk';
import { APP_SESSION_TOKEN_NAME } from '@/constant';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Always use getMeWithToken() to protect pages and user data.
 * Never trust cookie exists inside header. It isn't guaranteed to revalidate the Auth token.
 * It's safe to trust getMeWithToken() because it sends a request to the Directus Auth server every time to revalidate the Auth token.
 *
 * Docs: https://nextjs.org/blog/security-nextjs-server-components-actions
 *
 * TODO: improve with decrypt and encrypt session cookie with Jose
 */
export async function getMeWithToken(token: string) {
    try {
        // Fetch the currently authenticated user's details
        if (!token) {
            return {
                success: false,
                error: true,
                message: 'Failed to get cookie token',
            };
        }

        directusClient.setToken(token);
        const user = await directusClient.request(readMe());

        return { success: true, user };
    } catch (error) {
        if ((error as any).response && (error as any).response.status === 401) {
            redirect('/auth/login?token=EXPIRED');
        }
        throw new Error('Failed to fetch user data');
    }
}

export async function getDirectusCookie(): Promise<string | null> {
    const cookieData = (await cookies()).get(APP_SESSION_TOKEN_NAME)?.value;
    if (!cookieData) return null;
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(cookieData);
        }, 1000),
    );
}
