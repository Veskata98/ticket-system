'use server';

import { redirect } from 'next/navigation';

import { getSession } from '@/lib/session';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const createTicket = async (formData: FormData) => {
    try {
        const title = (formData.get('title') as string).trim();
        const description = (formData.get('description') as string).trim();

        if (!title.length) {
            return { error: 'Заглавието не може да бъде празно' };
        }

        if (!description.length) {
            return { error: 'Описанието не може да бъде празно' };
        }

        const loggedUser = await getSession();

        if (!loggedUser || loggedUser.role === 'admin') {
            return redirect('/');
        }

        await prisma.ticket.create({ data: { title, description, creatorId: loggedUser.id } });
        revalidatePath('/');

        return { error: null };
    } catch (e) {
        console.error(e);
        return { error: 'Възникна грешка на сървъра' };
    }
};

export const getTicketsForUser = async () => {
    try {
        const user = await getSession();

        if (!user) {
            redirect('/');
        }

        const tickets = await prisma.ticket.findMany({ where: { creatorId: user.id }, orderBy: { createdAt: 'desc' } });
        return tickets;
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const deleteTicket = async (ticketId: string) => {
    try {
        const user = await getSession();

        if (!user) {
            redirect('/');
        }

        await prisma.ticket.delete({ where: { id: ticketId, AND: { creatorId: user.id } } });
        revalidatePath('/');
    } catch (error) {}
};
