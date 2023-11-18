import React, { ReactNode, useEffect, useState } from "react";
import { darkThemeColors, lightThemeColors } from "./colors";
import { JColors } from "./contextTypes";

export const ThemeContext = React.createContext<{
    themeColors: JColors;
    toggleTheme: () => void;
}>({
    themeColors: lightThemeColors,
    toggleTheme: () => {},
});
const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLightTheme, setIsLightTheme] = useState<boolean | string | null>(
        localStorage.getItem("theme") === "light"
    );

    const [themeColors, setThemeColor] = useState<JColors>(
        localStorage.getItem("theme") === "dark" ? darkThemeColors : lightThemeColors
    );

    useEffect(() => {
        if (localStorage.getItem("theme") === "light") setIsLightTheme(true);
    }, []);

    useEffect(() => {
        if (isLightTheme) setThemeColor(lightThemeColors);
        else setThemeColor(darkThemeColors);
    }, [isLightTheme]);

    const toggleTheme = () => {
        if (localStorage.getItem("theme") === "light") {
            localStorage.setItem("theme", "dark");
            setIsLightTheme(false);
        } else {
            localStorage.setItem("theme", "light");
            setIsLightTheme(true);
        }
    };

    return (
        <ThemeContext.Provider value={{ themeColors: themeColors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
