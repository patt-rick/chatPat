import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import BuildIcon from "@mui/icons-material/Build";
import Dashboard from "./Views/Dashboard";
import Settings from "./Views/Settings";
import ClientMessages from "./Views/ClientMessages";
import Configuration from "./Views/Configuration";

export const AppRoutes = [
    {
        title: "Dashboard",
        id: "dashboard-001",
        url: "/",
        icon: GridViewIcon,
        component: Dashboard,
    },
    {
        title: "Messages",
        id: "clients-001",
        url: "/client-messages",
        icon: MarkAsUnreadIcon,
        component: ClientMessages,
    },
    {
        title: "Configuration",
        id: "configure-001",
        url: "/configuration",
        icon: BuildIcon,
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
