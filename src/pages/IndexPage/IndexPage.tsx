import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AssetList from "@/components/AssetList";
import { Logo, MdOutlineKeyboardArrowRight } from "@/components/icons";
import NFTList from "@/components/NFTList";
import { ProtocolsList } from "@/components/ProtocolList";
// import { postEvent } from "@telegram-apps/sdk";
import { useTonAddress } from "@tonconnect/ui-react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { API } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { ChartHome } from "@/components/ChartHome";
import { TimelineToolbar } from "@/components/TImelineToolbar";
import { Colors, TimelineKeys, TIMELINES_INTERVALS_SECONDS } from "@/constants";

export const shortenWallet = (wallet: string, startLength: number = 4, endLength: number = 4): string => {
  const start = wallet.substring(0, startLength);
  const end = wallet.substring(wallet.length - endLength);
  return `${start}...${end}`;
};


export const IndexPage: FC = () => {
    const navigate = useNavigate();
    const walletAddress = useTonAddress();
    const { initDataRaw, initData } = retrieveLaunchParams();

    useEffect(() => {
      if (initData?.startParam && initData?.startParam?.split("__wallet=").length > 1) {
        navigate("/friend");
      }
        if (walletAddress) return;
        setTimeout(() => {
            navigate("/connect");
        }, 300);
    }, [walletAddress]);

    const { data } = useQuery({
        queryKey: ["login"],
        queryFn: () => API.login(initDataRaw!),
        enabled: !!initDataRaw,
        retry: false,
    });

    useEffect(() => {
        if (data?.token) {
            localStorage.setItem('token', data?.token);
        }
    }, [data]);

    // const handlePremiumClick = () => {
    //     postEvent("web_app_trigger_haptic_feedback", {
    //         type: "impact",
    //         impact_style: "medium",
    //     });
    // };

    // State for selected timeline
    const [selectedTimeline, setSelectedTimeline] = useState<keyof typeof TIMELINES_INTERVALS_SECONDS>(TimelineKeys.Month);

    const handleTimelineSelect = (timeline: keyof typeof TIMELINES_INTERVALS_SECONDS) => {
        setSelectedTimeline(timeline);
    };

    return (
        <div className="bg-gray-800 min-h-screen select-none overflow-hidden">
            <div className="hero h-72 flex flex-col">
                <div className="userdata px-4 flex justify-between items-center mt-1">
                    <Link to={"/profiles"}>
                        <div className="flex items-center">
                            <Logo className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3"/>
                            <div className="items-center">
                                <p className="text-gray-400 font-light">{shortenWallet(walletAddress)}</p>
                            </div>
                            <MdOutlineKeyboardArrowRight color={Colors.zincLight} className="my-auto text-2xl" />
                        </div>
                    </Link>

                    {/* <Link
                        onClick={handlePremiumClick}
                        className="flex text-sm items-center text-yellow-300 shadow-md shadow-yellow-500/40 mr-1 px-3 bg-black border rounded-xl h-9"
                        to={"/premium"}
                    >
                        <IoDiamondOutline size={14} className="mr-2" />
                        Get Premium
                    </Link> */}
                </div>
                <div className="mt-auto mb-4">
                    <ChartHome timeline={selectedTimeline}/>
                    <TimelineToolbar onTimelineSelect={handleTimelineSelect}/>
                </div>
            </div>

            <div style={{minHeight: "60vh", height: "100%"}} className="p-5 rounded-t-3xl bg-gray-50 pb-32">
                <AssetList />
                <NFTList />
                <ProtocolsList />
            </div>
        </div>
    );
};

export default IndexPage;