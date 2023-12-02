import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import App from "./App";
import "./firebase-config";
import "./assets/Fonts/Inter-Bold.ttf";
import "./assets/Fonts/Inter-Light.ttf";
import "./assets/Fonts/Inter-SemiBold.ttf";
import "./assets/Fonts/Inter-Medium.ttf";
import "./assets/Fonts/Inter-Regular.ttf";
import "./assets/Fonts/Inter-Thin.ttf";
import "./index.css";
import "./assets/css/sideNav.css";
import ThemeContextProvider from "./Contexts/ThemeContext";
import UserContextProvider from "./Contexts/Usercontext";
import Notification from "./NotificationService/Notification";
import ClientsContextProvider from "./Contexts/ClientsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ThemeContextProvider>
                <UserContextProvider>
                    <ClientsContextProvider>
                        <Notification />
                        <CssBaseline />
                        <App />
                    </ClientsContextProvider>
                </UserContextProvider>
            </ThemeContextProvider>
        </ThemeProvider>
    </React.StrictMode>
);
