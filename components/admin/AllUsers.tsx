import { DeleteUserButton } from './DeleteUserButton';
import prisma from '@/lib/db';
import { TUser } from '@/types';

export const AllUsers = async () => {
    const users: TUser[] = await prisma.users.findMany({ where: { role: { not: 'admin' } } });

    if (!users.length) {
        return null;
    }

    return (
        <div className="p-4 w-48">
            {users.map((user) => (
                <div key={user.id} className="flex w-full justify-between items-center mb-2">
                    <p>{user.username}</p>
                    <DeleteUserButton id={user.id.toString()} username={user.username} />
                </div>
            ))}
        </div>
    );
};
