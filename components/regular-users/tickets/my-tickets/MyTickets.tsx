import { redirect } from 'next/navigation';

import { getTicketsForUser } from '@/actions/ticketActions';
import { getSession } from '@/lib/session';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteTicketButton } from './DeleteTicketButton';

export const MyTickets = async () => {
    const user = await getSession();

    if (!user) {
        redirect('/');
    }

    const tickets = await getTicketsForUser();

    return (
        <div>
            {tickets.length ? (
                <ul className="flex flex-col gap-4">
                    {tickets.map((t) => (
                        <li key={t.id}>
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>{t.title}</CardTitle>
                                    <DeleteTicketButton ticketId={t.id} />
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{t.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <p className="text-sm font-semibold">Created: {t.createdAt.toLocaleString()}</p>
                                </CardFooter>
                            </Card>
                        </li>
                    ))}
                </ul>
            ) : (
                <h2>Нямате създадени тикети</h2>
            )}
        </div>
    );
};
