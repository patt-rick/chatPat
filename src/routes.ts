import Dashboard from "./Views/Dashboard";
import Settings from "./Views/Settings";
import ClientMessages from "./Views/ClientMessages";
import Configuration from "./Views/Configuration";
import { MessageSquare, Settings2, SettingsIcon, Table2 } from "lucide-react";

export const MainRoutes = [
    {
        title: "Dashboard",
        id: "dashboard-001",
        url: "/dashboard",
        icon: Table2,
        component: Dashboard,
    },
    {
        title: "Messages",
        id: "clients-001",
        url: "/client-messages",
        icon: MessageSquare,
        component: ClientMessages,
    },
];
export const SecondaryRoutes = [
    {
        title: "Configuration",
        id: "configure-001",
        url: "/configuration",
        icon: Settings2,
        component: Configuration,
    },
    {
        title: "Settings",
        id: "settings-001",
        url: "/settings",
        icon: SettingsIcon,
        component: Settings,
    },
];
export const AppRoutes = [...MainRoutes, ...SecondaryRoutes];
