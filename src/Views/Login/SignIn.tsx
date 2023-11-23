import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

const SignIn = () => {
    const { themeColors } = useContext(ThemeContext);

    const [adminEmail, setAdminEmail] = React.useState("");
    const [adminPassword, setAdminPassword] = React.useState("");

    const handleLogin = () => {
        console.log({ adminEmail, adminPassword });
    };
    return (
        <div style={{ borderColor: themeColors.border }} className="form__wrapper">
            <TextField
                className="input-text"
                required
                id="standard-required"
                label="Email"
                variant="standard"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
            />
            <TextField
                sx={{ color: "yellow" }}
                className="input-text"
                required
                id="standard-required"
                label="Password"
                variant="standard"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
            />
            <Button
                onClick={handleLogin}
                sx={{ borderRadius: "8px", padding: "0.7rem" }}
                variant="contained"
            >
                log in
            </Button>
        </div>
    );
};

export default SignIn;
