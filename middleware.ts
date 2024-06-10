import { NextRequest, NextResponse } from 'next/server';
import { decrypt, updateSession } from './lib/session';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;

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
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
