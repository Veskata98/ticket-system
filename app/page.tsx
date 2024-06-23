import { getSession } from '@/lib/session';

import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import RegularUserDashboard from '@/components/regular-users/dashboard/RegularUserDashboard';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const user = await getSession();

    if (!user) {
        return <p>Влезте в системата, за да добавите заявка</p>;
    }

    return <>{user?.role === 'admin' ? <AdminDashboard /> : <RegularUserDashboard />}</>;
}
