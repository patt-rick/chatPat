import { JColors } from "./contextTypes";

const generalStyles = {
    radius: "0.5rem",
};

export const lightThemeColors: JColors = {
    ...generalStyles,
    background: "#FFFFFF",
    foreground: "#000",
    accentBackground: "#444",
    accentForeground: "#888",
    border: "#ddd",
};
export const darkThemeColors: JColors = {
    ...generalStyles,
    background: "#000",
    foreground: "#fff",
    accentBackground: "#aaa",
    accentForeground: "#939393",
    border: "#383838",
};
