import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useContext, useState } from "react";
import ColorSelect from "../components/ColorSelect";
import { ThemeContext } from "../Contexts/ThemeContext";

const Settings = () => {
    const { themeColors, toggleTheme } = useContext(ThemeContext);
    const [color, setColor] = useState(localStorage.getItem("APP_COLOR") || "#556cd6");
    const applyColorChange = () => {
        localStorage.setItem("APP_COLOR", color);
        window.location.reload();
    };
    const handleThemeChange = (_event: SelectChangeEvent<any>) => {
        toggleTheme();
    };

    return (
        <PageWrapper title={"Settings"} subTitle="Change the way your application feels">
            <div>
                <SettingsDiv>
                    <p>Change App theme</p>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={localStorage.getItem("theme")}
                        onChange={handleThemeChange}
                        sx={{
                            color: themeColors.accentForeground,
                            borderColor: themeColors.accentForeground,
                            margin: "2px 1rem",
                            width: "140px",
                        }}
                    >
                        <MenuItem
                            sx={{
                                color: themeColors.foreground,
                                backgroundColor: themeColors.background,
                            }}
                            value={"light"}
                        >
                            Light
                        </MenuItem>
                        <MenuItem
                            sx={{
                                color: themeColors.foreground,
                                backgroundColor: themeColors.background,
                            }}
                            value={"dark"}
                        >
                            Dark
                        </MenuItem>
                    </Select>
                </SettingsDiv>
                <SettingsDiv>
                    <p>Choose App color</p>
                    <ColorSelect value={color} onSelect={setColor} />
                    <Button
                        sx={{ color: themeColors.background, marginTop: "1rem" }}
                        variant="contained"
                        onClick={applyColorChange}
                        color="primary"
                    >
                        Apply
                    </Button>
                </SettingsDiv>
            </div>
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
    margin-bottom: 2rem;
`;
