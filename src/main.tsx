import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./firebase-config";
import "./index.css";
import UserContextProvider from "./Contexts/Usercontext";
import Notification from "./NotificationService/Notification";
import ClientsContextProvider from "./Contexts/ClientsContext";
import { ThemeProvider } from "./Contexts/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserContextProvider>
            <ClientsContextProvider>
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                    <Notification />
                    <App />
                </ThemeProvider>
            </ClientsContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
