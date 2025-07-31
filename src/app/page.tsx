import { getDirectusCookie, getMeWithToken } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function Home() {
    const me = await getMeWithToken();
    if (me.error || !me.user) redirect('/auth/login');

    return <>HOME</>;
}
