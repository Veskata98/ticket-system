import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Ticket System',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col h-full w-full">
                    <Toaster />
                    <Navbar />
                    <main className="w-full p-4">
                        <div className="flex items-center justify-center">{children}</div>
                    </main>
                </div>
            </body>
        </html>
    );
}
