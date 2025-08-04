'use client';

import { ActionState } from '@/lib/dal';
import React from 'react';
import { login, signUp } from '../actions';

interface LoginFormProps {
    mode: 'signin' | 'signup';
    // isTokenExpired: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ mode }) => {
    const [state, formAction, pending] = React.useActionState<ActionState, FormData>(
        mode === 'signin' ? login : signUp,
        {
            error: '',
        },
    );

    if (mode === 'signin') {
        return (
            <>
                <h2>Login</h2>
                <form action={formAction}>
                    <label>Email</label>
                    <input type="email" name="email" required />
                    <label>Password</label>
                    <input type="password" name="password" required />
                    <input type="submit" disabled={pending} />
                    {state?.error && <div>{state.error}</div>}
                </form>
            </>
        );
    }

    return null;
};
