import { NextRequest, NextResponse } from 'next/server';
import { decrypt, updateSession } from './lib/session';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;

    if (!session && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (session && request.nextUrl.pathname === '/login') {
        const decryptedValue = await decrypt(session);
        if ('user' in decryptedValue) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return await updateSession(request);
}

export const config = {
    matcher: [
        // '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/admin/:path*',
        '/login',
    ],
};
