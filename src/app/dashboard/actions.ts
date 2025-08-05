'use server';

import { getUser } from '@/lib/dal';
import { getSession } from '@/lib/session';

export const fetchUser = async () => {
    const session = await getSession();
    console.log('session', session);
    return await getUser();
};
