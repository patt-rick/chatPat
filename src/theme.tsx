import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create the light theme
const theme = createTheme({
    palette: {
        primary: {
            main: localStorage.getItem("APP_COLOR") || "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        // Other theme options for the light theme
    },
});

export { theme };
