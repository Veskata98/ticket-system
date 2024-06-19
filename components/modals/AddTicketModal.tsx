import { useEffect } from 'react';

type AddTicketModalProps = {
    isOpen: () => void;
    onClose: () => void;
};

export const AddTicketModal = ({ isOpen, onClose }: AddTicketModalProps) => {
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
                    <button onClick={onClose} className="text-red-600 hover:text-red-900 text-3xl pr-2">
                        &times;
                    </button>
                </div>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ticket Title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ticket Description"
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-green-600 text-white hover:bg-green-700 rounded-md"
                        >
                            Add Ticket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
