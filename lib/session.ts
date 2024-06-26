import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { SignJWT, jwtVerify } from 'jose';

import { User } from '@prisma/client';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: any) {
    return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().sign(secret);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, secret, {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;

    const { user }: { user: User } = await decrypt(session);
    return user;
}

export async function updateSession(request: NextRequest) {
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

    if (session && request.nextUrl.pathname.startsWith('/admin')) {
        const { user } = await decrypt(session);

        if (user?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (!session) {
        return;
    }

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 86400 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
