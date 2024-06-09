import { cookies } from 'next/headers';

export const getSession = () => {
    return !!cookies().get('session');
};
