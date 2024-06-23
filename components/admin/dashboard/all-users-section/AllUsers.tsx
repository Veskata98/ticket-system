import prisma from '@/lib/db';
import { User } from '@prisma/client';

import { DeleteUserButton } from '@/components/admin/dashboard/DeleteUserButton';

import * as ScrollArea from '@radix-ui/react-scroll-area';

export const AllUsers = async () => {
    const users: User[] = await prisma.user.findMany({ where: { role: { not: 'admin' } } });

    if (!users.length) {
        return null;
    }

    return (
        <div className="p-4 w-full">
            <h2 className="mb-2">Потребители</h2>
            <ScrollArea.Root className="relative h-[300px] overflow-hidden">
                <ScrollArea.Viewport className="w-full h-full rounded">
                    <div className="p-4">
                        {users.map((user) => (
                            <div key={user.id} className="flex w-full justify-between items-center mb-4 border-b-2 p-2">
                                <p>{user.username}</p>
                                <DeleteUserButton id={user.id.toString()} username={user.username} />
                            </div>
                        ))}
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="flex select-none p-[2px] w-[10px] bg-gray-200 transition ease-out rounded"
                >
                    <ScrollArea.Thumb className="flex-1 bg-emerald-500 rounded" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    );
};
