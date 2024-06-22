import { useEffect } from 'react';

import { deleteTicket } from '@/actions/ticketActions';

type AddTicketModalProps = {
    ticketId: string;
    isOpen: () => void;
    onClose: () => void;
};

export const DeleteTicketModal = ({ ticketId, isOpen, onClose }: AddTicketModalProps) => {
    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!isOpen) return null;

    const handleDelete = async () => {
        await deleteTicket(ticketId);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 shadow-lg w-5/6 md:w-2/3 lg:w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Изтриване на тикет</h2>
                    <button onClick={onClose} className="text-red-600 text-3xl pr-2">
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                        Сигурен ли си, че искаш да изтриеш този тикет?
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="mr-2 py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-md"
                    >
                        Отказ
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-rose-600 text-white hover:bg-rose-700 rounded-md"
                        onClick={handleDelete}
                    >
                        Изтрий
                    </button>
                </div>
            </div>
        </div>
    );
};
