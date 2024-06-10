'use client';

import { deleteUser } from '@/actions/userActions';
import { X } from 'lucide-react';

export const DeleteUserButton = ({ id }: { id: string }) => {
    return (
        <X
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={async () => {
                await deleteUser(id);
            }}
        />
    );
};
