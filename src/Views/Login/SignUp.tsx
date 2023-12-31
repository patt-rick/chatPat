import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { styled as Styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { Typography } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import BusinessIcon from "@mui/icons-material/Business";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { UserContext } from "../../Contexts/Usercontext";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Loader from "../../components/Loader";

const steps = ["Organization", "Admin"];
const SignUp = () => {
    const { themeColors } = useContext(ThemeContext);
    const { createOrganization, loading } = useContext(UserContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const maxPages = steps.length;

    const [organizationName, setOrganizationName] = useState("");
    const [organizationEmail, setOrganizationEmail] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const handleSignUp = async () => {
        if (
            !organizationEmail.trim() ||
            !organizationName.trim() ||
            !adminEmail.trim() ||
            !adminName.trim() ||
            !adminPassword.trim()
        )
            return;
        await createOrganization({
            organizationName,
            organizationEmail,
            adminEmail,
            adminName,
            adminPassword,
        });
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep < maxPages) return prevActiveStep + 1;
            return maxPages;
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep > 0) return prevActiveStep - 1;
            return 0;
        });
    };
    const handleStepChange = (index: number) => {
        // if (index < activeStep)
        setActiveStep(index);
    };

    const ColorlibConnector = Styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 17,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: theme.palette.primary.main,
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundColor: theme.palette.primary.main,
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor: themeColors.border,
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = Styled("div")<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: themeColors.border,
        zIndex: 1,
        color: themeColors.background,
        width: 35,
        height: 35,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        ...(ownerState.active && {
            backgroundColor: theme.palette.primary.main,
            boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
        }),
        ...(ownerState.completed && {
            backgroundColor: theme.palette.primary.main,
        }),
    }));
    return (
        <div>
            <div style={{ margin: "auto" }}>
                <div style={{ borderColor: themeColors.border }} className="form__wrapper">
                    {loading ? (
                        <div
                            style={{
                                display: "grid",
                                placeItems: "center",
                                height: "334px",
                                width: "307px",
                            }}
                        >
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <Stepper
                                alternativeLabel
                                activeStep={activeStep}
                                connector={<ColorlibConnector />}
                            >
                                {steps.map((label, index) => (
                                    <Step
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => handleStepChange(index)}
                                        key={label}
                                    >
                                        <StepLabel
                                            sx={{ fontSize: "1rem" }}
                                            StepIconComponent={ColorlibStepIcon}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "1rem",
                                                    textAlign: "center",
                                                    color: themeColors.accentForeground,
                                                }}
                                            >
                                                {label}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {activeStep === 0 ? (
                                <>
                                    <TextField
                                        className="input-text"
                                        required
                                        id="standard-org-name"
                                        label="Organization Name"
                                        variant="standard"
                                        value={organizationName}
                                        onChange={(e) => setOrganizationName(e.target.value)}
                                    />
                                    <TextField
                                        className="input-text"
                                        required
                                        id="standard-org-email"
                                        label="Organization Email"
                                        variant="standard"
                                        value={organizationEmail}
                                        onChange={(e) => setOrganizationEmail(e.target.value)}
                                    />
                                    <Button
                                        onClick={handleNext}
                                        sx={{ borderRadius: "8px", padding: "0.7rem" }}
                                        variant="contained"
                                    >
                                        Add an admin
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <TextField
                                        className="input-text"
                                        required
                                        id="standard-ad-name"
                                        label="Admin Name"
                                        variant="standard"
                                        value={adminName}
                                        onChange={(e) => setAdminName(e.target.value)}
                                    />
                                    <TextField
                                        className="input-text"
                                        required
                                        id="standard-ad-email"
                                        label="Admin Email"
                                        variant="standard"
                                        value={adminEmail}
                                        onChange={(e) => setAdminEmail(e.target.value)}
                                    />
                                    <TextField
                                        className="input-text"
                                        required
                                        id="standard-ad-password"
                                        label="Password"
                                        variant="standard"
                                        type="password"
                                        value={adminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                    />
                                    <div style={{ display: "flex", gap: "1rem" }}>
                                        <Button
                                            onClick={handleBack}
                                            sx={{ borderRadius: "8px", padding: "0.7rem", flex: 1 }}
                                            variant="outlined"
                                        >
                                            back
                                        </Button>
                                        <Button
                                            onClick={handleSignUp}
                                            sx={{ borderRadius: "8px", padding: "0.7rem", flex: 1 }}
                                            variant="contained"
                                        >
                                            Sign up
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
    function ColorlibStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        const icons: { [index: string]: React.ReactElement } = {
            1: completed ? <DoneIcon /> : <BusinessIcon />,
            2: completed ? <DoneIcon /> : <SupervisorAccountIcon />,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }
};

export default SignUp;
