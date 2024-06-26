'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

import { User } from '@prisma/client';

import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export const createUser = async (prevState: any, formData: FormData) => {
    try {
        const loggedUser = await getSession();

        if (!loggedUser || loggedUser.role !== 'admin') {
            return redirect('/');
        }

        const username = (formData.get('username') as string).toLowerCase().trim();
        const password = formData.get('password') as string;

        const duplicateUser = await prisma.user.findFirst({
            where: {
                username,
            },
        });

        if (duplicateUser) {
            return { username: null, error: 'Съществува профил с такова име' };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user: User = await prisma.user.create({ data: { username, hashedPassword } });

        revalidatePath('/admin/dashboard');
        return { username: user.username, error: null };
    } catch (error: any) {
        return { username: null, error: error.message as string };
    }
};

export const deleteUser = async (id: string) => {
    try {
        const loggedUser = await getSession();

        if (!loggedUser || loggedUser.role !== 'admin') {
            return redirect('/');
        }

        await prisma.user.delete({ where: { id } });
        revalidatePath('/admin/dashboard');
    } catch (error) {
        console.error('[DELETE_USER_SERVER_ACTION]Something went wrong!');
    }
};
