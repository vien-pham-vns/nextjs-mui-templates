import { getMe } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const me = await getMe();

    if (me.success) {
        redirect('/dashboard');
    }

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
