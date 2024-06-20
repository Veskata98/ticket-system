'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

import { TUser } from '@/types';

import prisma from '@/lib/db';

export const createUser = async (prevState: any, formData: FormData) => {
    try {
        const username = (formData.get('username') as string).toLowerCase().trim();
        const password = formData.get('password') as string;

        const duplicateUser = await prisma.users.findUnique({
            where: {
                username,
            },
        });

        if (duplicateUser) {
            return { username: null, error: 'Съществува профил с такова име' };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user: TUser = await prisma.users.create({ data: { username, hashedPassword } });

        revalidatePath('/admin/dashboard');
        return { username: user.username, error: null };
    } catch (error: any) {
        return { username: null, error: error.message as string };
    }
};

export const deleteUser = async (id: string) => {
    try {
        await prisma.users.delete({ where: { id } });
        revalidatePath('/admin/dashboard');
    } catch (error) {}
};
