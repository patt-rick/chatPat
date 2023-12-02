import { JColors } from "./contextTypes";

const generalStyles = {
    radius: "0.5rem",
};

export const lightThemeColors: JColors = {
    ...generalStyles,
    background: "#FFFFFF",
    foreground: "#000",
    accentBackground: "#efefef",
    accentForeground: "#888",
    border: "#ddd",
    chatBackgroundGradient: "linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.08))",
    shadowColor: "rgba(0, 0, 0, 0.55)",
};
export const darkThemeColors: JColors = {
    ...generalStyles,
    background: "#000",
    foreground: "#fff",
    accentBackground: "#1a1a1a",
    accentForeground: "#939393",
    border: "#383838",
    chatBackgroundGradient: "linear-gradient(to bottom, rgba(0,0,0,0.05), #c9c4c433)",
    shadowColor: "rgba(0, 0, 0, 0.95)",
};
