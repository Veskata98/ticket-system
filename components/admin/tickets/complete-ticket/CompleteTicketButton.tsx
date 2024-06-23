'use client';

import { completeTicket } from '@/actions/ticketActions';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

type CompleteTicketButtonProps = {
    ticketId: string;
};

export const CompleteTicketButton = ({ ticketId }: CompleteTicketButtonProps) => {
    return (
        <Button className="p-0 mx-2 h-[24px]" onClick={() => completeTicket(ticketId)}>
            <Check className="hover:text-emerald-500" width={20} height={20} />
        </Button>
    );
};
