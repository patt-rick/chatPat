import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";
import Start from "./Views/Start";
import Dashboard from "./Views/Dashboard";
import Settings from "./Views/Settings";

export const AppRoutes = [
    {
        title: "Get Started",
        id: "started-001",
        url: "/",
        icon: FlagIcon,
        component: Start,
    },
    {
        title: "Dashboard",
        id: "dashboard-001",
        url: "/dashboard",
        icon: GridViewIcon,
        component: Dashboard,
    },
    {
        title: "Settings",
        id: "settings-001",
        url: "/settings",
        icon: SettingsIcon,
        component: Settings,
    },
];
