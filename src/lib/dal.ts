import 'server-only';

import directusClient from './directus';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readMe } from '@directus/sdk';
import { APP_SESSION_TOKEN_NAME } from '@/constant';

export async function getMe() {
    try {
        // Fetch the currently authenticated user's details
        const token = (await cookies()).get(APP_SESSION_TOKEN_NAME)?.value;

        if (!token) {
            redirect('/login'); // Redirect if unauthorized
        }

        directusClient.setToken(token);
        const user = await directusClient.request(readMe());

        return { success: true, user };
    } catch (error) {
        console.log(error);
        redirect('/login'); // Redirect if unauthorized
    }
}
