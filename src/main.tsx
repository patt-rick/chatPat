import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./firebase-config";
import "./index.css";
import UserContextProvider from "./Contexts/Usercontext";
import Notification from "./NotificationService/Notification";
import ClientsContextProvider from "./Contexts/ClientsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserContextProvider>
            <ClientsContextProvider>
                <Notification />
                <App />
            </ClientsContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
