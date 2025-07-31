import { getDirectusCookie, getMeWithToken } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function Home() {
    const cookie = await getDirectusCookie();
    const me = await getMeWithToken(cookie as string);
    if (me.error || !me.user) redirect('/auth/login');

    return <>HOME</>;
}
