import React, { useMemo } from "react";
import {
    AppBar,
    Box,
    InputBase,
    Tab,
    Tabs,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    Toolbar,
    Drawer,
} from "@mui/material";
import { SearchIcon } from "@/components/icons";
import { SwapAsset } from "@/hooks";
import { debounce } from "underscore";
import emptyToken from "./emptyToken.png";

interface SelectTokenDrawerProps {
    open: boolean;
    onClose: () => void;
    onSelect: (token: SwapAsset) => void; 
    assets: SwapAsset[];
    filteredTokenAddress?: string;
}

export const SelectTokenDrawer: React.FC<SelectTokenDrawerProps> = ({ open, onClose, assets, onSelect, filteredTokenAddress }) => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [search, setSearch] = React.useState("");
    const [debouncedSearch, setDebouncedSearch] = React.useState("");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setTabIndex(newValue);
    };

    const debouncedSetSearch = React.useCallback(
        debounce((value: string) => setDebouncedSearch(value), 300),
        [],
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        debouncedSetSearch(event.target.value);
    };

    const assetsWithoutFilteredAddress = useMemo(() => assets.filter((asset) => asset.address.toLowerCase() !== filteredTokenAddress?.toLowerCase()), [assets, filteredTokenAddress]);

    const filteredAssets = useMemo(() => {
        if (!debouncedSearch) {
            return assetsWithoutFilteredAddress;
        }
        const lowerCaseSearch = debouncedSearch.toLowerCase();
        return assetsWithoutFilteredAddress.filter(
            (asset) =>
                asset.name.toLowerCase().includes(lowerCaseSearch) ||
                asset.symbol.toLowerCase().includes(lowerCaseSearch) ||
                asset.address.toLowerCase().includes(lowerCaseSearch)
        );
    }, [debouncedSearch, assetsWithoutFilteredAddress, filteredTokenAddress]);

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    maxHeight: "700px",
                    height: "calc(100vh - 80px)",
                    display: "flex",
                    flexDirection: "column",
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    overflow: "hidden",
                },
            }}
        >
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Select token
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ px: 2, py: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "grey.100",
                        border: "1px solid rgb(212, 212, 212)",
                        borderRadius: "0.75rem",
                        px: 1,
                    }}
                >   
                    <SearchIcon color="rgb(117, 127, 138)" />
                    <InputBase
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search assets or address"
                        sx={{ ml: 1, flex: 1, height: "3rem" }}
                    />
                </Box>
            </Box>

            <Tabs value={tabIndex} onChange={handleTabChange} sx={{ marginLeft: "16px" }}>
                <Tab label="All assets" />
            </Tabs>

            <Box sx={{ flex: 1, overflowY: "scroll", px: 2 }}>
                {filteredAssets.length > 0 ? (
                    <List>
                        {filteredAssets.map((token) => (
                            <React.Fragment key={token.name}>
                                <ListItem onClick={() => onSelect(token)}>
                                    <ListItemAvatar>
                                        <Avatar src={token.imageUrl} alt={token.name} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="body1">{token.name}</Typography>
                                                {token.amount && (
                                                    <Typography variant="body1">{token.amount}</Typography>
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    color: "grey.600",
                                                }}
                                            >
                                                <Typography variant="caption">{token.symbol}</Typography>
                                                {token.price && (
                                                    <Typography variant="caption">${token.price}</Typography>
                                                )}
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            color: "grey.500",
                            marginTop: 3,
                        }}
                    >
                        <img src={emptyToken} style={{ height: 100, width: 100 }} alt="Token not found" />
                        <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 500 }}>
                            We didn&apos;t find any assets
                        </Typography>
                        <Typography sx={{ color: "text.secondary", fontSize: 18 }}>Try searching by address</Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{ p: 2 }}>
                <Button
                    disableRipple
                    disableElevation
                    variant="contained"
                    color="primary"
                    sx={{
                        height: "48px",
                        backgroundColor: "rgba(77, 92, 107, 0.08)",
                        borderRadius: "12px",
                        boxShadow: "none",
                        color: "#0C0C0D",
                        textTransform: "none",
                        fontSize: 18,
                        "&:hover": {
                          backgroundColor: "rgba(77, 92, 107, 0.08)", // Keep the same color on hover to prevent highlight
                        },
                        "&:active": {
                          opacity: 0.7, // Adjust opacity to your preferred level on long press
                        },
                    }}
                    fullWidth
                    onClick={onClose}
                >
                    Close
                </Button>
            </Box>
        </Drawer>
    );
};
