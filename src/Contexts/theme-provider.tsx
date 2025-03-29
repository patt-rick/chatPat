import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ColorTheme = "blue" | "green" | "violet" | "yellow" | "red" | "orange" | "";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    defaultColorTheme?: ColorTheme;
    storageKey?: string;
    colorStorageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    colorTheme: ColorTheme;
    setTheme: (theme: Theme) => void;
    setColorTheme: (theme: ColorTheme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    colorTheme: "blue",
    setTheme: () => null,
    setColorTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    defaultColorTheme = "blue",
    storageKey = "vite-ui-theme",
    colorStorageKey = "vite-ui-color",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    const [colorTheme, setColorTheme] = useState<ColorTheme>(
        () => (localStorage.getItem(colorStorageKey) as ColorTheme) || defaultColorTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        root.classList.remove(
            "theme-blue",
            "theme-green",
            "theme-violet",
            "theme-yellow",
            "theme-red",
            "theme-orange",
            "theme-"
        );
        root.classList.add(`theme-${colorTheme}`);
    }, [theme, colorTheme]);

    const value = {
        theme,
        colorTheme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
        setColorTheme: (color: ColorTheme) => {
            localStorage.setItem(colorStorageKey, color);
            setColorTheme(color);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
