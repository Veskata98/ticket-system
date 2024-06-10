import { AllUsers } from '@/components/admin/AllUsers';
import { CreateUser } from '@/components/admin/CreateUser';

export default function AdminDashboardPage() {
    return (
        <main className="flex mx-auto w-2/3 justify-around">
            <AllUsers />
            <CreateUser />
        </main>
    );
}
