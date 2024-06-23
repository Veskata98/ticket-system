'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DeleteTicketModal } from '@/components/regular-users/modals/DeleteTicketModal';

export const DeleteTicketButton = ({ ticketId }: { ticketId: string }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <Button className="p-0 mx-2 hover:text-rose-500 h-[24px]" onClick={openModal}>
                <X width={20} height={20} />
            </Button>

            {isModalOpen && <DeleteTicketModal ticketId={ticketId} isOpen={openModal} onClose={closeModal} />}
        </>
    );
};
