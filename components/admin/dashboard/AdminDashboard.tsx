import { AllUsers } from './all-users-section/AllUsers';
import { CreateUser } from './create-user/CreateUser';

import { ReviewTickets } from '@/components/admin/tickets/review-tickets/ReviewTickets';

export default function AdminDashboard() {
    return (
        <div className="w-full lg:w-2/3">
            <div className="flex mx-auto justify-around md:flex-row flex-col">
                <AllUsers />
                <CreateUser />
            </div>
            <ReviewTickets />
        </div>
    );
}
