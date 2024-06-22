import prisma from '@/lib/db';
import { TUser } from '@/types';

import { DeleteUserButton } from '@/components/admin/dashboard/DeleteUserButton';

export const AllUsers = async () => {
    const users: TUser[] = await prisma.user.findMany({ where: { role: { not: 'admin' } } });

    if (!users.length) {
        return null;
    }

    return (
        <div className="p-4 md:w-60 w-full">
            {users.map((user) => (
                <div key={user.id} className="flex w-full justify-between items-center mb-4 border-b-2 p-2">
                    <p>{user.username}</p>
                    <DeleteUserButton id={user.id.toString()} username={user.username} />
                </div>
            ))}
        </div>
    );
};
