import AssistantIcon from "@mui/icons-material/Assistant";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../routes";
import { useState } from "react";

const SideNav = () => {
    const [activeRoute, setActiveRoute] = useState(window.location.pathname);

    return (
        <div className="sidebar__wrapper">
            <div className="logo__wrapper">
                <AssistantIcon fontSize="large" />
                ChatPat
            </div>
            <div className="menu">
                {AppRoutes.map((route) => {
                    return (
                        <span
                            onClick={() => setActiveRoute(route.url)}
                            key={route.id}
                            className="links"
                        >
                            <NavLink
                                style={{ color: activeRoute === route.url ? "#fff" : "" }}
                                to={route.url}
                            >
                                <route.icon
                                    color={activeRoute === route.url ? "primary" : "inherit"}
                                />
                                {route.title}
                            </NavLink>
                        </span>
                    );
                })}
            </div>
            <div className="helper__wrapper">
                <span className="links">Contact Us</span>
                <span className="links">
                    <LogoutIcon />
                    Logout
                </span>
            </div>
        </div>
    );
};

export default SideNav;
