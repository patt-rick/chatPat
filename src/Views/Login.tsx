import React, { useContext } from "react";

import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import "../assets/css/login.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import LoginSVG from "../assets/figures/LoginSVG";
import { ThemeContext } from "../Contexts/ThemeContext";

const Login = () => {
    const { isLightTheme, themeColors, toggleTheme } = useContext(ThemeContext);
    const handleThemeChange = (_event: any) => {
        toggleTheme();
    };
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
                <LoginSVG />
            </div>
            <div className="login_forms">
                <div>
                    <h3 style={{ color: themeColors.accentForeground }}>Welcome to</h3>
                    <h1 style={{ color: themeColors.foreground }}>QuickChat</h1>
                    <div style={{ borderColor: themeColors.border }} className="form__wrapper">
                        <TextField
                            className="input-text"
                            required
                            id="standard-required"
                            label="Email"
                            variant="standard"
                        />
                        <TextField
                            sx={{ color: "yellow" }}
                            className="input-text"
                            required
                            id="standard-required"
                            label="Password"
                            variant="standard"
                        />
                        <Button sx={{ borderRadius: "8px", padding: "0.7rem" }} variant="contained">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
