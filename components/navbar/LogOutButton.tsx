import { signOut } from '@/actions/authActions';

export const LogOutButton = () => {
    return (
        <form action={signOut}>
            <button type="submit">Изход</button>
        </form>
    );
};
