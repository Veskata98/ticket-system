import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center w-full h-full my-auto">
            <Loader2 className="animate-spin w-5 h-5" />
            <span>Зареждане...</span>
        </div>
    );
};
