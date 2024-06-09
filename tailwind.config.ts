import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    '50': '#f0fdf4', // Light green
                    '100': '#dcfce7', // Light green
                    '200': '#bbf7d0', // Light green
                    '300': '#86efac', // Light green
                    '400': '#4ade80', // Light green
                    '500': '#22c55e', // Green
                    '600': '#16a34a', // Green
                    '700': '#15803d', // Darker green
                    '800': '#166534', // Darker green
                    '900': '#14532d', // Dark green
                    '950': '#0f291e', // Very dark green
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;
