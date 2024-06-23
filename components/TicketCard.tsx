import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteTicketButton } from './DeleteTicketButton';

import { TTicket, TTicketWithCreator } from '@/types';
import { getSession } from '@/lib/session';

import { CompleteTicketButton } from './admin/tickets/complete-ticket/CompleteTicketButton';
import { cn } from '@/lib/utils';

type TicketCardProps = {
    ticket: TTicketWithCreator | TTicket;
    showCreator?: boolean;
};

export const TicketCard = async ({ ticket, showCreator = false }: TicketCardProps) => {
    const user = await getSession();

    const canEdit = user && user.role === 'admin';

    return (
        <Card
            className={cn(
                'border-double border-2 shadow-sm mb-4',
                ticket.finished ? 'border-emerald-500' : 'border-amber-500'
            )}
        >
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <CardTitle>{ticket.title}</CardTitle>
                    {ticket.finished ? (
                        <span className="text-emerald-500 font-semibold">Изпълнено</span>
                    ) : (
                        <div>
                            {canEdit && <CompleteTicketButton ticketId={ticket.id} />}
                            <DeleteTicketButton ticketId={ticket.id} />
                        </div>
                    )}
                </div>
                {showCreator && 'creator' in ticket && (
                    <CardDescription>Потребител: {ticket.creator.username}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <CardDescription>{ticket.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-sm font-semibold">Създаден на: {ticket.createdAt.toLocaleString()}</p>
            </CardFooter>
        </Card>
    );
};
