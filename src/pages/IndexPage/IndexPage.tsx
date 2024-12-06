import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AssetList from "@/components/AssetList";
import { Logo, MdOutlineKeyboardArrowRight, ShareIcon } from "@/components/icons";
import NFTList from "@/components/NFTList";
import { ProtocolsList } from "@/components/ProtocolList";
import { useTonAddress } from "@tonconnect/ui-react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { API } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { ChartHome } from "@/components/ChartHome";
import { TimelineToolbar } from "@/components/TImelineToolbar";
import { Colors, TimelineKeys, TIMELINES_INTERVALS_SECONDS } from "@/constants";
import { Button } from "@mui/material";
import { UserResponse } from "@/types";
import { UserServiceApi } from "@/api/userServiceApi";
import { useTelegramShare } from "@/hooks";
import { shareButtonStyles } from "./styles/styles";
import { GoogleAnalytics } from "@/services";

export const shortenWallet = (wallet: string, startLength: number = 4, endLength: number = 4): string => {
    const start = wallet.substring(0, startLength);
    const end = wallet.substring(wallet.length - endLength);
    return `${start}...${end}`;
};

export const IndexPage: FC = () => {
    const navigate = useNavigate();
    const walletAddress = useTonAddress();
    const { initDataRaw, initData } = retrieveLaunchParams();
    const { shareContent } = useTelegramShare();

    useEffect(() => {
        const scrollContainer = document.querySelector(".max-h-screen");
        if (scrollContainer) {
            scrollContainer.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        if (initData?.startParam && initData?.startParam?.split("__wallet=").length > 1) {
            navigate("/friend");
        }
        if (walletAddress) return;
        setTimeout(() => {
            console.log("nav connect");
            navigate("/connect");
        }, 300);
    }, [walletAddress]);

    const { data: userData } = useQuery<UserResponse>({
        queryKey: ["userData", walletAddress],
        queryFn: () => UserServiceApi.getUser(walletAddress),
        retry: 2,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        enabled: !!walletAddress,
    });

    const { data } = useQuery({
        queryKey: ["login"],
        queryFn: () => API.login(initDataRaw!),
        enabled: !!initDataRaw,
        retry: false,
    });

    useEffect(() => {
        if (data?.token) {
            localStorage.setItem("token", data?.token);
        }
    }, [data]);

    // State for selected timeline
    const [selectedTimeline, setSelectedTimeline] = useState<keyof typeof TIMELINES_INTERVALS_SECONDS>(
        TimelineKeys.Month,
    );

    const handleTimelineSelect = (timeline: keyof typeof TIMELINES_INTERVALS_SECONDS) => {
        setSelectedTimeline(timeline);
    };

    const handleOpenProfile = () => {
        GoogleAnalytics.openProfile();
    }

    return (
        <div className="bg-gray-800 min-h-screen select-none overflow-hidden">
            <div className="hero h-72 flex flex-col">
                <div className="userdata px-4 flex justify-between items-center mt-1">
                    <Link to={"/profiles"} onClick={handleOpenProfile}>
                        <div className="flex items-center">
                            <Logo className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3" />
                            <div className="items-center">
                                <p className="text-gray-400 font-light">{shortenWallet(walletAddress)}</p>
                            </div>
                            <MdOutlineKeyboardArrowRight color={Colors.zincLight} className="my-auto text-2xl" />
                        </div>
                    </Link>

                    {userData?.referral_link && walletAddress && (
                        <Button
                            variant="outlined"
                            sx={shareButtonStyles}
                            onClick={() => {
                                GoogleAnalytics.sharePortfolio();
                                shareContent(
                                    `https://t.me/TractionEyebot/app?startapp=${userData?.referral_link}__wallet=${walletAddress}`,
                                    "Check out my investment profile and join my network of contacts. Find out your social score 🏆",
                                );
                            }}
                        >
                            <ShareIcon size={12} className="mr-1" />
                            Share portfolio
                        </Button>
                    )}
                </div>
                <div style={{ touchAction: "none" }} className="mt-auto">
                    <ChartHome timeline={selectedTimeline} />
                    <TimelineToolbar friendWalletAddress={walletAddress} onTimelineSelect={handleTimelineSelect} />
                </div>
            </div>

            <div style={{ minHeight: "60vh", height: "100%" }} className="p-5 rounded-t-3xl bg-gray-50 pb-32">
                <AssetList />
                <NFTList />
                <ProtocolsList />
            </div>
        </div>
    );
};

export default IndexPage;
