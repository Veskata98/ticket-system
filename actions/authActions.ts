'use server';

import bcrypt from 'bcryptjs';

import { cookies } from 'next/headers'; // or any other library you are using to set cookies
import { redirect } from 'next/navigation'; // or your routing library

import { encrypt } from '@/lib/session'; // adjust the import based on your file structure

import connectToDatabase from '@/lib/db'; // adjust the path
import User from '@/models/User'; // adjust the path
import { User as UserType } from '@/types';

export const signIn = async (prevState: any, formData: FormData) => {
    const username = (formData.get('username') as string).toLowerCase();
    const password = formData.get('password') as string;

    await connectToDatabase();
    const user = await User.findOne({ username });

    if (!user) {
        return { error: 'Грешно потребителско име или парола' };
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isMatch) {
        return { error: 'Invalid credentials' };
    }

    // Create a session object without the password
    const sessionUser = {
        id: user._id.toString(),
        username: user.username,
        role: user.role,
    };

    const expires = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day in seconds
    const session = await encrypt({ user: sessionUser, exp: expires });

    // Save the session in a cookie
    cookies().set('session', session, { expires: new Date(expires * 1000), httpOnly: true });
    redirect('/');
};

export const createUser = async (prevState: any, formData: FormData) => {
    try {
        const username = (formData.get('username') as string).toLowerCase();
        const password = formData.get('password') as string;

        await connectToDatabase();

        const duplicateUser = await User.findOne({ username });

        if (duplicateUser) {
            return { username: null, error: 'Съществува профил с такова име' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user: UserType = await User.create({ username, hashedPassword });

        return { username: user.username, error: null };
        // return { username: 'asd2', error: null };
    } catch (error: any) {
        return { username: null, error: error.message as string };
    }
};

export const signOut = async () => {
    cookies().set('session', '', { expires: new Date(0) });
    redirect('/');
};
