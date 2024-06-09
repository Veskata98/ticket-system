'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { encrypt } from '@/lib/session';

export const signIn = async (formData: FormData) => {
    const username = (formData.get('username') as string).toLowerCase();
    const password = formData.get('password') as string;

    const user = { username, password };

    const expires = new Date(Date.now() + 86400 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set('session', session, { expires, httpOnly: true });
    redirect('/');
};

export const signOut = async () => {
    cookies().set('session', '', { expires: new Date(0) });
    redirect('/');
};
