import { getAllTicketsForAdmin } from '@/actions/ticketActions';

import { DeleteTicketButton } from '@/components/DeleteTicketButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export const ReviewTickets = async () => {
    const tickets = await getAllTicketsForAdmin();

    return (
        <div className="py-6">
            {tickets.length ? (
                <ScrollArea>
                    {tickets.map((t) => (
                        <div key={t.id}>
                            <Card className="border-0">
                                <CardHeader>
                                    <div className="flex flex-row justify-between items-center">
                                        <CardTitle className="">{t.title}</CardTitle>
                                        <DeleteTicketButton ticketId={t.id} />
                                    </div>
                                    <CardDescription>Потребител: {t.creator.username}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{t.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <p className="text-sm font-semibold">Създаден на: {t.createdAt.toLocaleString()}</p>
                                </CardFooter>
                            </Card>
                            <Separator />
                        </div>
                    ))}
                </ScrollArea>
            ) : (
                <h2>Няма създадени тикети</h2>
            )}
        </div>
    );
};
