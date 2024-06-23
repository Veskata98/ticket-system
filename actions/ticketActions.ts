'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/lib/session';
import prisma from '@/lib/db';

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

export const getAllTicketsForAdmin = async () => {
    try {
        const user = await getSession();

        if (!user || user.role !== 'admin') {
            redirect('/');
        }

        const tickets = await prisma.ticket.findMany({ include: { creator: true }, orderBy: { createdAt: 'desc' } });
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

        const canDelete = user.role === 'admin';

        const whereCondition = canDelete
            ? { id: ticketId } // If the user is an admin, only the ticket ID needs to match.
            : { id: ticketId, creatorId: user.id }; // If not an admin, both the ticket ID and creator ID must match.

        await prisma.ticket.delete({
            where: whereCondition,
        });

        revalidatePath('/');
    } catch (e) {
        console.error(e);
    }
};

export const completeTicket = async (ticketId: string) => {
    try {
        const user = await getSession();

        if (!user || user.role !== 'admin') {
            redirect('/');
        }

        await prisma.ticket.update({ where: { id: ticketId }, data: { finished: true } });

        revalidatePath('/');
    } catch (e) {
        console.error(e);
    }
};
