import { getMe } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function Home() {
    const me = await getMe();

    if (!me.success) {
        redirect('/login');
    } else {
        redirect('/dashboard');
    }
}
