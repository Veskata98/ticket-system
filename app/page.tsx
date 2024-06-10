import { AddTicketButton } from '@/components/tickets/AddTicketButton';

export default function Home() {
    return (
        <main className="w-full p-4">
            <div className="flex items-center justify-center">
                <AddTicketButton />
            </div>
        </main>
    );
}
