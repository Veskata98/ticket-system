import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type AddTicketButtonProps = {
    isOpen: () => void;
};

export const AddTicketButton = ({ isOpen }: AddTicketButtonProps) => {
    return (
        <Button
            className="flex flex-col items-center justify-center h-full 
                p-4 px-8 bg-green-500 text-white rounded-lg shadow-md 
                hover:bg-green-600 transition duration-300 ease-in-out"
            onClick={isOpen}
        >
            <PlusCircle className="w-10 h-10 mb-2" />
            <h1 className="text-lg font-semibold">Добави тикет</h1>
        </Button>
    );
};
