import { getDirectusCookie, getMeWithToken } from '@/lib/dal';
import { redirect } from 'next/navigation';
import { APP_SESSION_EXPIRED } from '@/constant';
import React from 'react';
import { LoginForm } from './_components/LoginForm';

interface LoginPageProps {
    searchParams: Promise<{ token?: string }>;
}

const LoginPage: React.FC<LoginPageProps> = async ({ searchParams }) => {
    const { token } = await searchParams;

    const cookie = await getDirectusCookie();
    const me = await getMeWithToken(cookie as string);
    if (!me.error || me.user) redirect('/dashboard');

    return <LoginForm isTokenExpired={token === APP_SESSION_EXPIRED} />;
};

export default LoginPage;
