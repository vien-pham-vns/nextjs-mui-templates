import { NextRequest, NextResponse } from 'next/server';
import { getDirectusCookie, getMeWithToken } from './dal';

export default async function directusSession(request: NextRequest) {
    const cookie = await getDirectusCookie();
    const me = await getMeWithToken(cookie as string);

    if (me.error || !me.user) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL('/', request.nextUrl));
}
