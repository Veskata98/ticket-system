'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { useToast } from '@/components/ui/use-toast';

import { createUser } from '@/actions/userActions';

const initialState: { username: string | null; error: string | null } = {
    username: null,
    error: null,
};

export const CreateUser = () => {
    const { toast } = useToast();
    const [state, formAction] = useFormState(createUser, initialState);
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (state.username) {
            formRef?.current?.reset();
            toast({
                className: 'bg-green-500 text-white font-semibold',
                description: `${state.username} е създаден успешно!`,
            });
        }
    }, [state.username, toast]);

    return (
        <section className="flex-1">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Добавяне на профил
                        </h1>
                        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
                        <form
                            className="space-y-4 md:space-y-6"
                            ref={formRef}
                            action={async (formData) => {
                                formAction(formData);
                                if (!state.error) {
                                    formRef.current?.reset();
                                }
                            }}
                        >
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                    Потребителско Име
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                                    placeholder="klt"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Парола
                                </label>
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Qaz123"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Създай
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
