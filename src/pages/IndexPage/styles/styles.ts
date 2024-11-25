import { SxProps, Theme } from "@mui/material";

export const shareButtonStyles: SxProps<Theme> = {
    color: "white", // Text color
    borderColor: "rgba(255, 255, 255, 0.3)", // Border color
    borderRadius: "8px", // Rounded corners
    textTransform: "none", // Disable uppercase text
    fontSize: "0.75rem", // Font size
    padding: "8px 12px", // Padding for button
    transition: "all 0.3s ease",
    height: "26px",
    "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.5)", // Hover border color
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Hover background
    },
};
