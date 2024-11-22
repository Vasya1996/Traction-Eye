/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, Typography, Link } from "@mui/material";
import { SocialScoreDrawer } from "./components";
import socialNetwork from "./socialNetwork.png";
import socialAvatar from "./socialAvatar.png";
import { useQuery } from "@tanstack/react-query";
import { UserServiceApi } from "@/api/userServiceApi";
import { UserResponse } from "@/types";
import { useTelegramShare } from "@/hooks";
import { useTonAddress } from "@tonconnect/ui-react";

export const SocialScorePage: React.FC = () => {
    const { shareContent } = useTelegramShare();
    const userFriendlyAddress = useTonAddress();

    const { data: userData } = useQuery<UserResponse>({
        queryKey: ["userData", userFriendlyAddress],
        queryFn: () => UserServiceApi.getUser(userFriendlyAddress),
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        enabled: !!userFriendlyAddress,
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#EFEFF3",
                paddingBottom: "90px",
                overflow: "auto,",
            }}
        >
            <img src={socialNetwork} alt="social score" style={{ height: 213, width: "auto" }} />
            {/* Hexagon Network Image */}
            {/* Title */}
            <Typography sx={{ color: "#1F2937", mt: 1.5 }} variant="h5" fontWeight="bold" gutterBottom>
                Social Capital
            </Typography>

            {/* Description */}
            <Box sx={{ width: "100%", paddingLeft: "24px" }}>
                <Typography
                    sx={{ color: "#1F2937", width: "100%", marginTop: "16px" }}
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                >
                    Invite your friends and grow the value of your connections and relationships with others.
                </Typography>
                <Typography sx={{ color: "#1F2937", marginTop: "12px" }} variant="body1" color="textSecondary">
                    You and your friend will get a{" "}
                    <Link
                        component="button"
                        onClick={handleDrawerOpen}
                        sx={{
                            color: "#1e88e5",
                            height: "inherit",
                            display: "inline-block",
                            textDecoration: "none",
                            lineHeight: "inherit",
                            paddingBottom: "1.1px",
                        }}
                    >
                        social score
                    </Link>
                </Typography>
            </Box>

            {/* Invite Button */}
            <Button
                variant="contained"
                color="warning"
                fullWidth
                disabled={!userData?.referral_link}
                onClick={() => {
                    shareContent(
                        `https://t.me/TractionEyebot/app?startapp=${userData?.referral_link}__wallet=${userFriendlyAddress}`,
                        "Check out my investment profile and join my network of contacts. Find out your social score 🏆",
                    );
                }}
                sx={{
                    height: "56px",
                    color: "#1F2937",
                    fontWeight: "bold",
                    marginTop: 2,
                    borderRadius: "15px",
                    paddingY: 1.5,
                    backgroundColor: "#FFD235",
                    textTransform: "none",
                    fontSize: "19px",
                }}
            >
                Invite friends
            </Button>

            {/* Social Score */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4.5, width: "100%" }}>
                <Typography sx={{ color: "#1F2937", fontSize: "24px" }} variant="h6" fontWeight="bold">
                    Your social score {Number(userData?.social_score) > 0 ? `+${userData?.social_score}` : 0}
                </Typography>

                {/* Social Score List */}
                <List
                    sx={{
                        marginTop: 2,
                        backgroundColor: "#fff",
                        borderRadius: "16px",
                        width: "100%",
                        padding: "6px 16px",
                    }}
                >
                    {(!userData?.referrals || userData?.referrals?.length === 0) && (
                        <Typography
                            variant="body1"
                            sx={{ color: "#1F2937", padding: "8px 0px", fontWeight: 300, opacity: 0.5 }}
                        >
                            You don't have any social contacts yet
                        </Typography>
                    )}
                    {(userData?.referrals ?? []).map(({ referral_id, wallet, net_worth }) => (
                        <ListItem key={referral_id} sx={{ height: "40px" }}>
                            <ListItemAvatar sx={{ minWidth: "33px" }}>
                                <Avatar sx={{ height: "30px", width: "30px" }}>
                                    <img src={socialAvatar} />
                                </Avatar>
                            </ListItemAvatar>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexGrow: 1,
                                    alignItems: "center",
                                }}
                            >
                                {/* Username aligned to the left */}
                                <Typography sx={{ color: "#1F2937", paddingBottom: "8px" }} variant="body1">
                                    {wallet.substring(0, 10)}
                                </Typography>

                                {/* Score aligned to the right */}
                                <Typography sx={{ color: "#1F2937", paddingBottom: "8px" }} variant="body1">
                                    +{net_worth}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <SocialScoreDrawer
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                referral_link={`${userData?.referral_link}__wallet=${userFriendlyAddress}`}
            />
        </Box>
    );
};
