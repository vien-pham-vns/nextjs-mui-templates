import { APP_SESSION_TOKEN_NAME } from '@/constant';
// import { signToken, verifyToken } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './lib/dal';

const protectedRoutes = '/dashboard';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookies = request.cookies.get(APP_SESSION_TOKEN_NAME);
    const isProtectedRoute = pathname.startsWith(protectedRoutes);

    if (isProtectedRoute && !sessionCookies?.value) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const res = NextResponse.next();

    if (sessionCookies && request.method === 'GET') {
        try {
            // const parsed = await verifyToken(sessionCookies.value);
            // const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

            // res.cookies.set({
            //     name: APP_SESSION_TOKEN_NAME,
            //     value: await signToken({
            //         ...parsed,
            //         expires: expiresInOneDay.toISOString(),
            //     }),
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'strict',
            //     path: '/',
            //     expires: expiresInOneDay,
            // });
            await getUser();
        } catch (error) {
            console.log('Error updating session:', error);
            res.cookies.delete(APP_SESSION_TOKEN_NAME);
            if (isProtectedRoute) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }
        }
    }

    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
