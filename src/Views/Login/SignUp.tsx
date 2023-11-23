import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
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

const steps = ["Organization", "Admin"];
const SignUp = () => {
    const { themeColors } = useContext(ThemeContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const maxPages = steps.length;

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
            <div>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
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
            </div>
            <div style={{ margin: "auto" }}>
                {activeStep === 0 ? (
                    <div style={{ borderColor: themeColors.border }} className="form__wrapper">
                        <TextField
                            className="input-text"
                            required
                            id="standard-required"
                            label="Organization Name"
                            variant="standard"
                        />
                        <TextField
                            sx={{ color: "yellow" }}
                            className="input-text"
                            required
                            id="standard-required"
                            label="Organization Email"
                            variant="standard"
                        />
                        <Button
                            onClick={handleNext}
                            sx={{ borderRadius: "8px", padding: "0.7rem" }}
                            variant="contained"
                        >
                            Add an admin
                        </Button>
                    </div>
                ) : (
                    <div style={{ borderColor: themeColors.border }} className="form__wrapper">
                        <TextField
                            className="input-text"
                            required
                            id="standard-required"
                            label="Admin Name"
                            variant="standard"
                        />
                        <TextField
                            sx={{ color: "yellow" }}
                            className="input-text"
                            required
                            id="standard-required"
                            label="Admin Email"
                            variant="standard"
                        />
                        <TextField
                            sx={{ color: "yellow" }}
                            className="input-text"
                            required
                            id="standard-required"
                            label="Password"
                            variant="standard"
                            type="password"
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
                                sx={{ borderRadius: "8px", padding: "0.7rem", flex: 1 }}
                                variant="contained"
                            >
                                Sign up
                            </Button>
                        </div>
                    </div>
                )}
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
