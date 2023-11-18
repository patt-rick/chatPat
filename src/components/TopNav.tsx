import { Avatar, Badge } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import UserMenu from "./UserMenu";
import "../assets/css/topnav.css";
import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

interface TopNavProps {
    title: string;
    subTitle?: string;
}
const TopNav = (props: TopNavProps) => {
    const { toggleTheme, isLightTheme } = useContext(ThemeContext);

    const handleThemeChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
        toggleTheme();
    };
    return (
        <div className="top__nav">
            <div className="page__title">
                {props.title}
                <span>{props.subTitle}</span>
            </div>
            <div className="nav__actions">
                <Badge color="primary" variant="dot">
                    <NotificationsNoneIcon style={{ cursor: "pointer" }} />
                </Badge>
                <div className="user_Profile">
                    <Avatar sx={{ width: 30, height: 30, margin: "0 10px" }} src="" /> Jenny Wilson
                    <UserMenu />
                </div>
                <div className="theme__toggle">
                    {isLightTheme ? (
                        //@ts-ignore
                        <ModeNightIcon onClick={handleThemeChange} style={{ cursor: "pointer" }} />
                    ) : (
                        //@ts-ignore
                        <LightModeIcon onClick={handleThemeChange} style={{ cursor: "pointer" }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNav;
