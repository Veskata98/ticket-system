import { getAllTicketsForAdmin } from '@/actions/ticketActions';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { TicketCard } from '@/components/TicketCard';

export const ReviewTickets = async () => {
    const tickets = await getAllTicketsForAdmin();

    const completedTickets = tickets.filter((x) => x.finished === true);
    const waitingTickets = tickets.filter((x) => x.finished !== true);

    return (
        <div className="py-6">
            <h2>Очакващи отговор</h2>
            <div className="p-4">
                {waitingTickets.length ? (
                    <ScrollArea>
                        {waitingTickets.map((t) => (
                            <TicketCard key={t.id} ticket={t} showCreator={true} />
                        ))}
                    </ScrollArea>
                ) : (
                    <h2>Няма чакащи заявки</h2>
                )}
            </div>

            <h2>Изпълнени заявки</h2>
            <div className="p-4">
                {completedTickets.length ? (
                    <ScrollArea>
                        {completedTickets.map((t) => (
                            <TicketCard key={t.id} ticket={t} showCreator={true} />
                        ))}
                    </ScrollArea>
                ) : (
                    <h2>Няма изпълнени заявки</h2>
                )}
            </div>
        </div>
    );
};
