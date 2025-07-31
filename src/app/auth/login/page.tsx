import { getDirectusCookie, getMeWithToken } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const cookie = await getDirectusCookie();
    const me = await getMeWithToken(cookie as string);
    if (!me.error || me.user) redirect('/');

    return (
        <>
            <h2>Login</h2>
            <form action="/api/auth/login" method="POST">
                <label>Email</label>
                <input type="email" name="email" required />
                <label>Password</label>
                <input type="password" name="password" required />
                <input type="submit" />
            </form>
        </>
    );
}
