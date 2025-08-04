'use server';

import { APP_SESSION_TOKEN_NAME } from '@/constant';
import { validatedAction } from '@/lib/dal';
import directusClient from '@/lib/directus';
import { setSession } from '@/lib/session';
import { readMe } from '@directus/sdk';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

const loginSchema = z.object({
    email: z.email().min(3).max(255),
    password: z.string().min(8).max(100),
});

export const login = validatedAction(loginSchema, async (data, formData) => {
    const { email, password } = data;

    if (!email || !password) {
        return { error: 'All fields are required', status: 400 };
    }

    debugger;
    const response = await directusClient.login({ email, password });

    if (!response.access_token) {
        return {
            error: 'Invalid email or password. Please try again.',
            email,
            password,
        };
    }

    const user = await directusClient.request(readMe());
    await setSession(user.id);

    redirect('/dashboard');
});

export async function signUp() {
    return null;
}

export async function logOut() {
    (await cookies()).delete(APP_SESSION_TOKEN_NAME);
}
