import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';

export const AddTicketButton = () => {
    return (
        <Button className="flex flex-col h-full p-4 bg-green-500 text-white rounded">
            <PlusCircle className="w-12 h-12 rounded-full" />
            <h1 className="text-xl font-bold">Добави тикет</h1>
        </Button>
    );
};
