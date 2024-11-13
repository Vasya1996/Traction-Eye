import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Drawer,
    InputBase,
    ToggleButton,
    ToggleButtonGroup,
    IconButton,
} from "@mui/material";
import { CloseIcon } from "@/components/icons";

interface SlippageSettingsDrawerProps {
    open: boolean;
    onClose: () => void;
    onSave: (slippage: number) => void;
}

export const SlippageSettingsDrawer: React.FC<SlippageSettingsDrawerProps> = ({ open, onClose, onSave }) => {
    const [slippage, setSlippage] = useState<number>(5);
    const [customSlippage, setCustomSlippage] = useState<string>("");

    const handleSlippageChange = (_event: React.MouseEvent<HTMLElement>, newSlippage: string | null) => {
        if (newSlippage !== null) {
            setSlippage(Number(newSlippage));
            setCustomSlippage("");
        }
    };

    const handleCustomSlippageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomSlippage(event.target.value);
        setSlippage(0);
    };

    const hasError = useMemo(() => (Number(customSlippage) > 50 || Number(customSlippage) < 0) && !!customSlippage, [customSlippage]);

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    height: "100%",
                    maxHeight: "550px",
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    p: 4,
                },
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    Settings
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
                Slippage
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                Your transaction will revert if the price changes unfavorably by more than this percentage.
            </Typography>
            <Box className="flex flex-1 flex-col">
                <ToggleButtonGroup
                    value={slippage}
                    exclusive
                    onChange={handleSlippageChange}
                    // fullWidth
                    sx={{
                        mb: 2,
                        "& .MuiToggleButton-root": {
                            border: "1px solid rgba(0, 0, 0, 0.12)", // Apply border to all buttons in the group
                            borderRadius: 3,
                            backgroundColor: "rgb(245, 247, 249)",
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#1F2937 !important",
                            color: "#fff !important"
                        },
                        "& .MuiToggleButtonGroup-lastButton": {
                            marginLeft: 1.5
                        },
                        "& .MuiToggleButtonGroup-firstButton": {
                            marginRight: 1.5, // Adds horizontal margin between buttons
                        }

                    }}
                >
                    <ToggleButton
                        value={1}
                        sx={{
                            flex: 1,
                        }}
                    >
                        1%
                    </ToggleButton>
                    <ToggleButton
                        value={5}
                        sx={{
                            flex: 1,
                        }}
                    >
                        5%
                    </ToggleButton>
                    <ToggleButton
                        value={10}
                        sx={{
                            flex: 1,
                            
                        }}
                    >
                        10%
                    </ToggleButton>
                </ToggleButtonGroup>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: hasError ? "1px solid red" : "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: 3,
                        px: 2,
                        py: 1,
                        mb: 1,
                        color: "#757E8A",
                    }}
                >
                    <InputBase
                        fullWidth
                        type="number"
                        value={customSlippage}
                        onChange={handleCustomSlippageChange}
                        placeholder="Custom %"
                        sx={{
                            color: "inherit",
                        }}
                        error={hasError}
                        prefix="%"
                    />
                </Box>
                {hasError && <Typography sx={{color: "red", fontSize: 14}}>The maximum slippage tolerance cannot be more than 50%. The recommended range is 1%</Typography>}
            </Box>
            <Button
                variant="contained"
                fullWidth
                disabled={slippage === 0 && customSlippage === "" || hasError}
                onClick={() => onSave(Number(slippage || customSlippage))}
                sx={{
                    bgcolor: "#F5B502",
                    color: "black",
                    "&:hover": { bgcolor: "#F5B502" },
                    borderRadius: "12px",
                    height: "48px",
                    fontSize: 18,
                    textTransform: "none"
                }}
            >
                Save
            </Button>
        </Drawer>
    );
};
