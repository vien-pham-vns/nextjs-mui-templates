'use server';

import { APP_SESSION_TOKEN_NAME } from '@/constant';
import directusClient from '@/lib/directus';
import { setSession } from '@/lib/session';
import { validatedAction } from '@/utils/validate-action';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import z from 'zod';

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { message: 'Password is required' }),
});

export const login = validatedAction(loginSchema, async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
        return { error: 'All fields are required', status: 400 };
    }

    try {
        const response = await directusClient.login({ email, password });
        if (!response.access_token) {
            return {
                error: 'Invalid email or password. Please try again.',
                email,
                password,
            };
        }
        await setSession(response.access_token);
    } catch (error) {
        console.error(error);
        throw new Error('Use can not login. Please contact admin');
    }

    redirect('/dashboard', RedirectType.replace);
});

export async function signUp() {
    return null;
}

export async function logOut() {
    (await cookies()).delete(APP_SESSION_TOKEN_NAME);
    redirect('/', RedirectType.replace);
}
