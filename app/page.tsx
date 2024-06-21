import { getSession } from '@/lib/session';

import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import RegularUserDashboard from '@/components/regular-users/dashboard/RegularUserDashboard';

export default async function Home() {
    const user = await getSession();

    if (!user) {
        return <p>Влез в системата, за да добавиш тикет</p>;
    }

    return <>{user?.role === 'admin' ? <AdminDashboard /> : <RegularUserDashboard />}</>;
}
