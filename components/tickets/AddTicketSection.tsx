'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AddTicketModal } from '@/components/modals/AddTicketModal';

export const AddTicketSection = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div>
            <Button
                className="flex flex-col h-full p-4 px-8 bg-green-500 text-white rounded"
                onClick={() => setModalOpen((prevState) => !prevState)}
            >
                <PlusCircle className="w-12 h-12 rounded-full" />
                <h1 className="text-xl font-bold">Добави тикет</h1>
            </Button>

            {isModalOpen && <AddTicketModal isOpen={openModal} onClose={closeModal} />}
        </div>
    );
};
