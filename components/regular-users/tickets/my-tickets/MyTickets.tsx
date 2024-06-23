import { redirect } from 'next/navigation';

import { getTicketsForUser } from '@/actions/ticketActions';
import { getSession } from '@/lib/session';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteTicketButton } from '@/components/DeleteTicketButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TicketCard } from '@/components/TicketCard';

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
                    <h2 className="text-xl mb-4 font-semibold">Моите заявки</h2>
                    <ScrollArea>
                        {tickets.map((t) => (
                            <TicketCard key={t.id} ticket={t} />
                        ))}
                    </ScrollArea>
                </>
            ) : (
                <h2>Нямате създадени тикети</h2>
            )}
        </div>
    );
};
