'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

import connectToDatabase from '@/lib/db';
import User from '@/models/User';

import { TUser } from '@/types';

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

        const user: TUser = await User.create({ username, hashedPassword });

        revalidatePath('/admin/dashboard');
        return { username: user.username, error: null };
        // return { username: 'asd2', error: null };
    } catch (error: any) {
        return { username: null, error: error.message as string };
    }
};

export const deleteUser = async (id: string) => {
    try {
        await User.deleteOne({ _id: id });
        revalidatePath('/admin/dashboard');
    } catch (error) {}
};
