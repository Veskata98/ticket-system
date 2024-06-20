import { AddTicketSection } from '@/components/tickets/AddTicketSection';
import { getSession } from '@/lib/session';

export default async function Home() {
    const user = await getSession();

    return (
        <main className="w-full p-4">
            <div className="flex items-center justify-center">
                {user ? <AddTicketSection /> : <p>Влез в системата, за да добавиш тикет</p>}
            </div>
        </main>
    );
}
