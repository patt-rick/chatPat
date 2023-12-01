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
                            foreground={themeColors.foreground}
                            accent={themeColors.accentForeground}
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
                <Span
                    foreground={themeColors.foreground}
                    accent={themeColors.accentForeground}
                    className="links"
                >
                    Contact Us
                </Span>
                <Span
                    foreground={themeColors.foreground}
                    accent={themeColors.accentForeground}
                    onClick={handleLogout}
                    className="links"
                >
                    <LogoutIcon />
                    Logout
                </Span>
            </div>
        </div>
    );
};

export default SideNav;
interface Props {
    accent: string;
    foreground: string;
}
const Span = styled.span<Props>`
    color: ${(props: Props) => props.accent};
    &:hover {
        color: ${(props: Props) => props.foreground};
    }

    a {
        color: ${(props: Props) => props.accent};
        &:hover {
            color: ${(props: Props) => props.foreground};
        }
    }
`;
