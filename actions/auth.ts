'use server';

import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const login = async (formData: FormData) => {
    const username = (formData.get('username') as string).toLowerCase();
    const password = formData.get('password') as string;

    await signIn({ username, password });
    redirect('/');
};
