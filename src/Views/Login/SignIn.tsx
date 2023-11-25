import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { UserContext } from "../../Contexts/Usercontext";
import { useNavigate } from "react-router-dom";
import { showInfo } from "../../NotificationService/NotificationService";
import Loader from "../../components/Loader";

const SignIn = () => {
    const navigate = useNavigate();
    const { themeColors } = useContext(ThemeContext);
    const { signIn, loading } = useContext(UserContext);

    const [adminEmail, setAdminEmail] = React.useState("");
    const [adminPassword, setAdminPassword] = React.useState("");

    const handleLogin = async () => {
        if (!adminEmail.trim() || !adminPassword.trim()) return;
        const resp = await signIn({ email: adminEmail, password: adminPassword });
        if (resp.success) {
            navigate("/");
            showInfo(`Welcome ${resp.name}`, 3000);
        }
    };
    return (
        <div style={{ borderColor: themeColors.border }} className="form__wrapper">
            {loading ? (
                <div
                    style={{
                        display: "grid",
                        placeItems: "center",
                        height: "204px",
                        width: "307px",
                    }}
                >
                    <Loader />
                </div>
            ) : (
                <>
                    <TextField
                        className="input-text"
                        required
                        id="standard-email"
                        label="Email"
                        variant="standard"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ color: "yellow" }}
                        type="password"
                        className="input-text"
                        required
                        id="standard-password"
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
                </>
            )}
        </div>
    );
};

export default SignIn;
