import { redirect } from 'next/navigation';

import { getTicketsForUser } from '@/actions/ticketActions';
import { getSession } from '@/lib/session';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteTicketButton } from '@/components/DeleteTicketButton';

export const MyTickets = async () => {
    const user = await getSession();

    if (!user) {
        redirect('/');
    }

    const tickets = await getTicketsForUser();

    return (
        <div>
            {tickets.length ? (
                <>
                    <h2 className="text-xl mb-4 font-semibold">Моите тикети</h2>
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
                                        <p className="text-sm font-semibold">
                                            Създаден на: {t.createdAt.toLocaleString()}
                                        </p>
                                    </CardFooter>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <h2>Нямате създадени тикети</h2>
            )}
        </div>
    );
};
