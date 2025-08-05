'use client';

import React from 'react';
import Form from 'next/form';
import ZodErrors from '@/components/zod-errors';
import { ActionState } from '@/utils/validate-action';
import { login, signUp } from '../actions';

interface LoginFormProps {
    mode: 'signin' | 'signup';
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
                <Form action={formAction} noValidate>
                    <label>Email</label>
                    <input type="email" name="email" required />
                    <ZodErrors error={state?.zodErrors?.email} />
                    <label>Password</label>
                    <input type="password" name="password" required />
                    <ZodErrors error={state?.zodErrors?.password} />
                    <input type="submit" disabled={pending} />
                </Form>
            </>
        );
    }

    return null;
};
