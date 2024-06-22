'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { deleteTicket } from '@/actions/ticketActions';

export const DeleteTicketButton = ({ ticketId }: { ticketId: string }) => {
    const onDelete = async () => {
        await deleteTicket(ticketId);
    };

    return (
        <Button className="p-0 hover:text-rose-500" onClick={onDelete}>
            <X />
        </Button>
    );
};
