'use client';

import React from 'react';
import { clearExpiredCookie } from '../actions';

interface LoginFormProps {
    isTokenExpired: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isTokenExpired }) => {
    React.useEffect(() => {
        if (isTokenExpired) {
            clearExpiredCookie();
        }
    }, [isTokenExpired]);

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
};
