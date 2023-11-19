import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import ColorSelect from "../components/ColorSelect";
import { ThemeContext } from "../Contexts/ThemeContext";

const Settings = () => {
    const { themeColors } = useContext(ThemeContext);
    const [color, setColor] = useState(localStorage.getItem("APP_COLOR") || "#556cd6");
    const applyColorChange = () => {
        localStorage.setItem("APP_COLOR", color);
        window.location.reload();
    };

    return (
        <PageWrapper title={"Settings"} subTitle="Change the way your application feels">
            <SettingsDiv>
                <p>Choose App color:</p>
                <ColorSelect value={color} onSelect={setColor} />
                <Button
                    sx={{ color: themeColors.background }}
                    variant="contained"
                    onClick={applyColorChange}
                    color="primary"
                >
                    Apply
                </Button>
            </SettingsDiv>
        </PageWrapper>
    );
};

export default Settings;

const SettingsDiv = styled.div`
    font-size: 1.1rem;
    font-weight: 400;
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    height: fit-content;
`;
