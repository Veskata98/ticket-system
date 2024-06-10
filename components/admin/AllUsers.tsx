import User from '@/models/User';
import { TUser } from '@/types';
import { X } from 'lucide-react';
import { DeleteUserButton } from './DeleteUserButton';

export const AllUsers = async () => {
    const users: TUser[] = await User.find({ role: 'regular' });
    return (
        <div className="p-4 w-48">
            {users.map((user) => (
                <div key={user._id} className="flex w-full justify-between items-center mb-2">
                    <p>{user.username}</p>
                    <DeleteUserButton id={user._id.toString()} username={user.username} />
                </div>
            ))}
        </div>
    );
};
