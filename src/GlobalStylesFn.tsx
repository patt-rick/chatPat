import { GlobalStyles } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./Contexts/ThemeContext";
import { theme } from "./theme";

export function GlobalStylesFn() {
    const { themeColors } = useContext(ThemeContext);
    return (
        <GlobalStyles
            styles={{
                //ADD CATEGORY
                ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                    fontFamily: "Inter",
                    color: `${themeColors.foreground} !important`,
                },
                // ".css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                //     fontFamily: "Inter",
                //     color: `#666  !important`,
                // },
                // ".css-1c2i806-MuiFormLabel-root-MuiInputLabel-root": {
                //     color: `#666  !important`,
                // },
                // ".css-4mzek5-MuiFormControl-root-MuiTextField-root ": {
                //     marginRight: "1rem !important",
                // },
                ".css-z5ibk7-MuiInputBase-root-MuiInput-root:before ": {
                    borderColor: `${themeColors.border}  !important`,
                },
                ".css-v4u5dn-MuiInputBase-root-MuiInput-root:before ": {
                    borderBottom: `2px solid ${themeColors.border} !important`,
                },
                ".css-7gm2v-MuiFormLabel-root-MuiInputLabel-root": {
                    color: `${themeColors.accentForeground}  !important`,
                },
                ".css-t5f2vx-MuiFormLabel-root-MuiInputLabel-root": {
                    color: `${themeColors.accentForeground} !important`,
                },
                ".css-t5f2vx-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                    color: `${theme.palette.primary.main}  !important`,
                },
                // ".Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                //     border: `1px solid yellow  !important`,
                // },
                // ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                //     color: `#222 !important`,
                // },
                // ".css-ptiqhd-MuiSvgIcon-root": {
                //     color: `#222 !important`,
                // },
                ".css-1wuilmg-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input": {
                    padding: "1rem !important",
                    borderRadius: "5px",
                },
                ".css-1wuilmg-MuiAutocomplete-root .MuiOutlinedInput-root": {
                    padding: `0px  !important`,
                },
                ".MuiAutocomplete-listbox": {
                    backgroundColor: `#fff!important`,
                    fontSize: "14px !important",
                    border: `1px solid #bbb !important`,
                    borderRadius: "4px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                },

                ".css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
                    backgroundColor: `${themeColors.accentBackground} !important`,
                },
                ".css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                    color: `${themeColors.accentForeground} !important`,
                },
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderColor: `${themeColors.border} !important`,
                },
                ".css-10rc3y2-MuiFormLabel-root-MuiInputLabel-root": {
                    color: `${themeColors.accentForeground} !important`,
                },
                ".css-ouh8do-MuiFormLabel-root-MuiInputLabel-root": {
                    color: `${themeColors.accentForeground} !important`,
                },
                // ".css-zddlty-MuiButtonBase-root-MuiButton-root ": {
                //     backgroundColor: `#333 !important`,
                // },
                // ".css-zddlty-MuiButtonBase-root-MuiButton-root ": {
                //     backgroundColor: `#333 !important`,
                // },
            }}
        />
    );
}
