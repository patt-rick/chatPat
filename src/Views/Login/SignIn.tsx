import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

const SignIn = () => {
    const { themeColors } = useContext(ThemeContext);
    return (
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
                log in
            </Button>
        </div>
    );
};

export default SignIn;
