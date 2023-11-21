import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function UserMenu() {
    const { themeColors } = React.useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {/* @ts-ignore */}
            <KeyboardArrowDownIcon
                style={{ cursor: "pointer", position: "relative", top: "3px" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                onClick={handleClick}
            />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    sx={{ color: themeColors.foreground, backgroundColor: themeColors.background }}
                    onClick={handleClose}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
