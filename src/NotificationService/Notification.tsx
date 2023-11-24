import React, { useEffect, useState } from "react";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

type AlertType = "success" | "error" | "warning" | "info";

function Notification() {
    const [alert, setAlert] = useState<AlertType>("info");
    const [open, setOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        window.addEventListener("NotificationEvent", handleAlert);

        return () => {
            window.removeEventListener("NotificationEvent", handleAlert);
        };
    }, []);

    const handleAlert = (event: any) => {
        setAlertMessage(event.detail.msg);
        setAlert(event.detail.type);
        setOpen(true);

        // Hide the alert after 3 seconds
        if (["success"].includes(event.detail.type))
            setTimeout(() => {
                setOpen(false);
            }, event.detail.duration);
    };
    const handleClose = (_event: React.SyntheticEvent | Event) => {
        setOpen(false);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                sx={{ maxWidth: "50%" }}
                TransitionComponent={TransitionLeft}
            >
                <Alert
                    variant="filled"
                    onClose={handleClose}
                    severity={alert}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
    type TransitionProps = Omit<SlideProps, "direction">;
    function TransitionLeft(props: TransitionProps) {
        return <Slide {...props} direction="left" />;
    }
}

export default Notification;
