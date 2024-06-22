import { MyTickets } from '../tickets/my-tickets/MyTickets';
import { CreateTicket } from '../tickets/create-ticket/CreateTicket';

const RegularUserDashboard = () => {
    return (
        <div className="w-full">
            <CreateTicket />
            <div className="w-full md:w-2/3 m-auto">
                <MyTickets />
            </div>
        </div>
    );
};

export default RegularUserDashboard;
