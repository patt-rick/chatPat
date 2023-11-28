import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../routes";
import { useContext, useState } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import styled from "styled-components";
import { UserContext } from "../Contexts/Usercontext";
import Logo from "../assets/figures/Logo";

const SideNav = () => {
    const { logout } = useContext(UserContext);
    const { themeColors } = useContext(ThemeContext);
    const [activeRoute, setActiveRoute] = useState(window.location.pathname);
    const organisationData = JSON.parse(localStorage.getItem("ORGANISATION") || "{}");

    const handleLogout = () => {
        logout();
    };

    const Span = styled.span`
        color: ${themeColors.accentForeground};
        &:hover {
            color: ${themeColors.foreground};
        }

        a {
            color: ${themeColors.accentForeground};
            &:hover {
                color: ${themeColors.foreground};
            }
        }
    `;
    return (
        <div className="sidebar__wrapper">
            <div style={{ borderColor: themeColors.border }} className="logo__wrapper">
                <Logo />
                QuickChat
            </div>
            <div style={{ borderColor: themeColors.border }} className="menu">
                <h3 style={{ margin: "0", fontWeight: "600" }}>{organisationData?.name}</h3>
                {AppRoutes.map((route) => {
                    return (
                        <Span
                            onClick={() => setActiveRoute(route.url)}
                            key={route.id}
                            className="links"
                        >
                            <NavLink
                                style={{
                                    color: activeRoute === route.url ? themeColors.foreground : "",
                                }}
                                to={route.url}
                            >
                                <route.icon
                                    color={activeRoute === route.url ? "primary" : "inherit"}
                                />
                                {route.title}
                            </NavLink>
                        </Span>
                    );
                })}
            </div>
            <div style={{ borderColor: themeColors.border }} className="helper__wrapper">
                <Span className="links">Contact Us</Span>
                <Span onClick={handleLogout} className="links">
                    <LogoutIcon />
                    Logout
                </Span>
            </div>
        </div>
    );
};

export default SideNav;
