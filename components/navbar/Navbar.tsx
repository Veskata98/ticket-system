import { getSession } from '@/lib/session';
import Link from 'next/link';

import { LogOutButton } from './LogOutButton';

export const Navbar = async () => {
    const hasUser = await getSession();

    return (
        <div className="w-full p-4 bg-zinc-200 ">
            <div className="flex justify-between w-2/3 m-auto">
                <h1>
                    <Link href="/">Начало</Link>
                </h1>
                <ul>
                    <li></li>
                    <li></li>
                    {hasUser ? (
                        <li>
                            <LogOutButton />
                        </li>
                    ) : (
                        <li>
                            <Link href="/login">Вход</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};
