'use client';

import { useState } from 'react';

import { AddTicketButton } from './AddTicketButton';
import { AddTicketModal } from '@/components/regular-users/modals/AddTicketModal';

export const CreateTicket = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="w-full flex justify-center pb-4">
            <AddTicketButton isOpen={openModal} />
            {isModalOpen && <AddTicketModal isOpen={openModal} onClose={closeModal} />}
        </div>
    );
};
