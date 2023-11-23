import React, { useContext } from "react";

import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import "../../assets/css/login.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import LoginSVG from "../../assets/figures/LoginSVG";
import { ThemeContext } from "../../Contexts/ThemeContext";
import styled from "styled-components";
import { theme } from "../../theme";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import TabList from "@mui/lab/TabList";

const Login = () => {
    const { isLightTheme, themeColors, toggleTheme } = useContext(ThemeContext);
    const [value, setValue] = React.useState("2");
    const handleThemeChange = (_event: any) => {
        toggleTheme();
    };
    const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const StyledTabList = styled(TabList)<{
        themecolor: string;
    }>`
        .MuiTabs-scroller.MuiTabs-fixed.css-jpln7h-MuiTabs-scroller
            .MuiTabs-indicator.css-1aquho2-MuiTabs-indicator {
            background-color: ${(props) => props.themecolor};
        }
    `;
    return (
        <div style={{ backgroundColor: themeColors.background }} className="login__wrapper">
            <div className="theme__toggle">
                {isLightTheme ? (
                    <ModeNightIcon
                        onClick={handleThemeChange}
                        style={{ cursor: "pointer", color: themeColors.foreground }}
                    />
                ) : (
                    <LightModeIcon
                        onClick={handleThemeChange}
                        style={{ cursor: "pointer", color: themeColors.foreground }}
                    />
                )}
            </div>
            <div className="image">
                <LoginSVG signUp={value === "2"} />
            </div>
            <div className="login_forms">
                <div>
                    <h3 style={{ color: themeColors.accentForeground }}>Welcome to</h3>
                    <h1 style={{ color: themeColors.foreground }}>QuickChat</h1>
                    <TabContext value={value}>
                        <div>
                            <StyledTabList
                                onChange={handleTabChange}
                                centered
                                themecolor={theme.palette.primary.main}
                            >
                                <Tab
                                    style={{
                                        color: theme.palette.primary.main,
                                        borderColor: theme.palette.primary.main,
                                        fontWeight: 600,
                                    }}
                                    label="Sign Up"
                                    value="1"
                                />
                                <Tab
                                    style={{
                                        color: theme.palette.primary.main,
                                        borderColor: theme.palette.primary.main,
                                        fontWeight: 600,
                                    }}
                                    label="Log In"
                                    value="2"
                                />
                            </StyledTabList>
                        </div>
                        <TabPanel value="1">
                            <SignUp />
                        </TabPanel>
                        <TabPanel value="2">
                            <SignIn />
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
        </div>
    );
};

export default Login;
