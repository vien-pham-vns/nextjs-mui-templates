import { getDirectusCookie, getMeWithToken } from '@/lib/dal';
import { redirect } from 'next/navigation';
import React from 'react';

const Home: React.FC = async () => {
    const cookie = await getDirectusCookie();
    const me = await getMeWithToken(cookie as string);
    if (me.error || !me.user) redirect('/auth/login');

    redirect('/dashboard');
};

export default Home;
