import { AllUsers } from './all-users-section/AllUsers';
import { CreateUser } from './create-user/CreateUser';

export default function AdminDashboard() {
    return (
        <div className="flex mx-auto w-2/3 justify-around">
            <AllUsers />
            <CreateUser />
        </div>
    );
}
