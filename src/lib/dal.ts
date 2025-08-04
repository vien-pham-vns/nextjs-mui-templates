import 'server-only';

import directusClient from './directus';
import { readMe } from '@directus/sdk';
import { APP_SESSION_TOKEN_NAME } from '@/constant';
import { cookies } from 'next/headers';
import { verifyToken } from './session';
import { User } from '@/app/models/user';
import z from 'zod';

/**
 * Always use getMeWithToken() to protect pages and user data.
 * Never trust cookie exists inside header. It isn't guaranteed to revalidate the Auth token.
 * It's safe to trust getMeWithToken() because it sends a request to the Directus Auth server every time to revalidate the Auth token.
 *
 * Docs: https://nextjs.org/blog/security-nextjs-server-components-actions
 *
 * TODO: improve with decrypt and encrypt session cookie with Jose
 */
type DirectusUser = Record<string, any> & Partial<User>;

export async function getUser() {
    const sessionCookies = (await cookies()).get(APP_SESSION_TOKEN_NAME);

    if (!sessionCookies || !sessionCookies.value) {
        return null;
    }

    const sessionData = await verifyToken(sessionCookies.value);
    if (!sessionData || !sessionData.user || typeof sessionData.user.id !== 'string') {
        return null;
    }

    if (new Date(sessionData.expires) < new Date()) {
        return null;
    }

    try {
        // directusClient.setToken(token);
        const user: DirectusUser = await directusClient.request(readMe());
        if (!user?.id) {
            return null;
        }

        return user;
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

export type ActionState = {
    error?: string;
    success?: string;
    [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (data: z.infer<S>, formData: FormData) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(schema: S, action: ValidatedActionFunction<S, T>) {
    return async (prevState: ActionState, formData: FormData) => {
        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { error: result.error?.message };
        }

        return action(result.data, formData);
    };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
    data: z.infer<S>,
    formData: FormData,
    user: DirectusUser,
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
    schema: S,
    action: ValidatedActionWithUserFunction<S, T>,
) {
    return async (prevState: ActionState, formData: FormData) => {
        const user = await getUser();
        if (!user) {
            // redirect('/auth/login');
            throw new Error('User is not authenticated');
        }

        const result = schema.safeParse(Object.fromEntries(formData));
        if (!result.success) {
            return { error: result.error.message };
        }

        return action(result.data, formData, user);
    };
}
