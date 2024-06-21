'use client';

import { useState } from 'react';

import { AddTicketModal } from '@/components/regular-users/modals/AddTicketModal';
import { AddTicketButton } from '../tickets/AddTicketButton';

const RegularUserDashboard = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div>
            <AddTicketButton isOpen={openModal} />

            {isModalOpen && <AddTicketModal isOpen={openModal} onClose={closeModal} />}
        </div>
    );
};

export default RegularUserDashboard;
