import { getDirectusCookie, getMeWithToken } from '@/lib/dal';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard: React.FC = async () => {
    const cookie = await getDirectusCookie();
    const me = await getMeWithToken(cookie as string);
    if (me.error || !me.user) redirect('/auth/login');

    return (
        <main>
            Vienda
            <form action="/api/auth/logout" method="POST">
                <button type="submit">Logout</button>
            </form>
            <h1>Welcome!</h1>
            <p>Your id: {me.user.id}</p>
        </main>
    );
};

export default Dashboard;
