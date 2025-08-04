import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { APP_SESSION_TOKEN_NAME } from '@/constant';

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

type SessionData = {
    user: { id: string };
    expires: string;
};
export async function signToken(payload: SessionData) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1 day from now')
        .sign(key);
}

export async function verifyToken(input: string) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload as SessionData;
}

export async function getSession() {
    const session = (await cookies()).get(APP_SESSION_TOKEN_NAME)?.value;
    if (!session) return null;
    return await verifyToken(session);
}

export async function setSession(userId: string) {
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session: SessionData = {
        user: { id: userId },
        expires: expiresInOneDay.toISOString(),
    };
    const encryptedSession = await signToken(session);
    (await cookies()).set(APP_SESSION_TOKEN_NAME, encryptedSession, {
        expires: expiresInOneDay,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });
}
