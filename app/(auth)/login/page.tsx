'use client';

import { login } from '@/actions/auth';
import { Eye } from 'lucide-react';

import { useState } from 'react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);

    return (
        <section className="flex-1">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Влизане в профил
                        </h1>
                        <form className="space-y-4 md:space-y-6" action={login}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                    Потребителско Име
                                </label>
                                <input
                                    type="username"
                                    name="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                                    placeholder="klt"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Парола
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setShowEyeIcon(!!e.target.value.length)}
                                    name="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                    className={`absolute right-0 top-10 flex items-center px-2 focus:outline-none ${
                                        !showEyeIcon && 'hidden'
                                    }`}
                                >
                                    <Eye className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Влизане
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
