import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { createTicket } from '@/actions/ticketActions';

type AddTicketModalProps = {
    isOpen: () => void;
    onClose: () => void;
};

const initialState: { error: null | string } = {
    error: null,
};

export const AddTicketModal = ({ isOpen, onClose }: AddTicketModalProps) => {
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 shadow-lg w-5/6 md:w-2/3 lg:w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Добави тикет</h2>
                    <button onClick={onClose} className="text-red-600 text-3xl pr-2">
                        &times;
                    </button>
                </div>
                {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
                <form
                    action={async (formData) => {
                        const res = await createTicket(formData);

                        if (!res.error) {
                            onClose();
                        }

                        setError(res.error);
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Заглавие
                        </label>
                        <input
                            name="title"
                            type="text"
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                            Описание на проблема
                        </label>
                        <textarea
                            name="description"
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block focus:outline-none"
                        ></textarea>
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
                            className="py-2 px-4 bg-green-600 text-white hover:bg-green-700 rounded-md"
                        >
                            Добави
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
