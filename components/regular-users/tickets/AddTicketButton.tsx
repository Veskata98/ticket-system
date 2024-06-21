import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type AddTicketButtonProps = {
    isOpen: () => void;
};

export const AddTicketButton = ({ isOpen }: AddTicketButtonProps) => {
    return (
        <Button className="flex flex-col h-full p-4 px-8 bg-green-500 text-white rounded" onClick={isOpen}>
            <PlusCircle className="w-12 h-12 rounded-full" />
            <h1 className="text-xl font-bold">Добави тикет</h1>
        </Button>
    );
};
