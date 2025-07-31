import { getMe } from '@/lib/dal';

export default async function Dashboard() {
    const me = await getMe();

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
}
