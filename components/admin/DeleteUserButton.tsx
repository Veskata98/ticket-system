'use client';

import { useState } from 'react';

import { deleteUser } from '@/actions/userActions';
import { X } from 'lucide-react';
import { toast } from '../ui/use-toast';

import { DeleteUserModal } from '@/components/modals/DeleteUserModal';

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
                onClick={() => setModalOpen((prevState) => !prevState)}
            />
            {isModalOpen && <DeleteUserModal userId={id} username={username} isOpen={openModal} onClose={closeModal} />}
        </>
    );
};
