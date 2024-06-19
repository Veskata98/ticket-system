'use client';

// import { deleteUser } from '@/actions/userActions';
import { X } from 'lucide-react';
import { toast } from '../ui/use-toast';

export const DeleteUserButton = ({ id, username }: { id: string; username: string }) => {
    return (
        <X
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={async () => {
                // await deleteUser(id);
                toast({
                    className: 'bg-red-500 text-white font-semibold',
                    description: `${username} е изтрит успешно!`,
                });
            }}
        />
    );
};
