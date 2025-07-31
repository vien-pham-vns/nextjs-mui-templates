import { NextRequest, NextResponse } from 'next/server';
import { getMeWithToken } from './dal';

export default async function directusSession(request: NextRequest) {
    const me = await getMeWithToken();
    if (me.error || !me.user) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.redirect(new URL('/', request.nextUrl));
}
