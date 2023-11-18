import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import GridViewIcon from "@mui/icons-material/GridView";

export const AppRoutes = [
    {
        title: "Get Started",
        id: "started-001",
        url: "/getting-started",
        icon: FlagIcon,
        component: null,
    },
    {
        title: "Dashboard",
        id: "dashboard-001",
        url: "/dashboard",
        icon: GridViewIcon,
        component: null,
    },
    {
        title: "Settings",
        id: "settings-001",
        url: "/settings",
        icon: SettingsIcon,
        component: null,
    },
];
