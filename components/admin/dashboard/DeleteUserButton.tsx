'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import { DeleteUserModal } from '@/components/admin/modals/DeleteUserModal';

export const DeleteUserButton = ({ id, username }: { id: string; username: string }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <X
                width={20}
                height={20}
                className="cursor-pointer hover:text-rose-500 hover:font-bold"
                onClick={openModal}
            />
            {isModalOpen && <DeleteUserModal userId={id} username={username} isOpen={openModal} onClose={closeModal} />}
        </>
    );
};
