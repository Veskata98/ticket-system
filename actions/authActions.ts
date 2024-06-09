'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1 day')
        .sign(secret);
};

export const decrypt = async (jwt: any) => {
    return await jwtVerify(jwt, secret, { algorithms: ['HS256'] });
};

export const signIn = async (formData: FormData) => {
    const username = (formData.get('username') as string).toLowerCase();
    const password = formData.get('password') as string;

    const user = { username, password };

    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set('session', session, { expires, httpOnly: true });
    redirect('/');
};

export const signOut = async () => {
    cookies().set('session', '', { expires: new Date(0) });
    redirect('/');
};
