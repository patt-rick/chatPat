/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                border: "oklch(var(--border))",
                input: "oklch(var(--input))",
                ring: "oklch(var(--ring))",
                background: "oklch(var(--background))",
                foreground: "oklch(var(--foreground))",
                primary: {
                    DEFAULT: "oklch(var(--primary))",
                    foreground: "oklch(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "oklch(var(--secondary))",
                    foreground: "oklch(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "oklch(var(--destructive))",
                    foreground: "oklch(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "oklch(var(--muted))",
                    foreground: "oklch(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "oklch(var(--accent))",
                    foreground: "oklch(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "oklch(var(--popover))",
                    foreground: "oklch(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "oklch(var(--card))",
                    foreground: "oklch(var(--card-foreground))",
                },
            },
            animation: {
                "fade-in-up": "fadeInUp 0.5s ease-out",
            },
            keyframes: {
                fadeInUp: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-hide": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
