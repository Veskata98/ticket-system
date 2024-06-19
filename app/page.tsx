import { AddTicketSection } from '@/components/tickets/AddTicketSection';

export default function Home() {
    return (
        <main className="w-full p-4">
            <div className="flex items-center justify-center">
                <AddTicketSection />
            </div>
        </main>
    );
}
