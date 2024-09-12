import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AssetList from "@/components/AssetList";
import TELogo from "@/pages/IndexPage/TELogo.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import NFTList from "@/components/NFTList";
import ProtocolsList from "@/components/ProtocolsList";
import { IoDiamondOutline } from "react-icons/io5";
import { postEvent } from "@telegram-apps/sdk";
import { useTonAddress } from "@tonconnect/ui-react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { API } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { ChartHome } from "@/components/ChartHome";

export const IndexPage: FC = () => {
    const navigate = useNavigate();
    const walletAdress = useTonAddress();
    const { initDataRaw } = retrieveLaunchParams();

    const { data } = useQuery({
        queryKey: ["login"],
        queryFn: () => API.login(initDataRaw!),
        enabled: !!initDataRaw,
    });

    useEffect(() => {
        if (data?.token) {
            localStorage.setItem('token', data?.token);
        }
    }, [data]);

    const handlePremiumClick = () => {
        postEvent("web_app_trigger_haptic_feedback", {
            type: "impact",
            impact_style: "medium",
        });
    };

    useEffect(() => {
        if (walletAdress) return;
        setTimeout(() => {
            navigate("/connect");
        }, 300);
    }, [walletAdress]);

    const shortenWallet = (wallet: string, startLength: number = 4, endLength: number = 4): string => {
        const start = wallet.substring(0, startLength);
        const end = wallet.substring(wallet.length - endLength);
        return `${start}...${end}`;
    };

    // State for selected timeline
    const [selectedTimeline, setSelectedTimeline] = useState<string>("MAX");

    const handleTimelineSelect = (timeline: string) => {
        setSelectedTimeline(timeline);
        // Call postEvent to setup swipe behavior
        postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'rigid' });

    };

    // Array of timeline options
    const timelines = ["1H", "D", "W", "M", "1Y", "MAX"];

    return (
        <div className="bg-gray-800 min-h-screen select-none">
            <div className="hero h-72 flex flex-col">
                <div className="userdata px-4 flex justify-between items-center">
                    <Link to={"/profiles"}>
                        <div className="flex items-center">
                            <img
                                className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3"
                                src={TELogo}
                                alt=""
                            />
                            <div className="items-center">
                                <p className="text-gray-400 font-light">{shortenWallet(walletAdress)}</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className="text-zinc-400 my-auto text-2xl" />
                        </div>
                    </Link>

                  {/*<Link
                        onClick={handlePremiumClick}
                        className="flex text-sm items-center text-yellow-300 shadow-md shadow-yellow-500/40 mr-1 px-3 bg-black border rounded-xl h-9"
                        to={"/premium"}
                    >
                        <IoDiamondOutline className="mr-2" />
                        Get Premium
                    </Link>*/}
                </div>
                <div className="mt-auto mb-4">
                    <ChartHome />

                    {/* Timeline select */}

                    {walletAdress ?
                                        <div className="mt-3 flex justify-center text-sm">
                                        <ul className="flex gap-1 bg-black py-1 px-1 rounded-xl">
                                            {timelines.map((timeline) => (
                                                <li
                                                    key={timeline}
                                                    onClick={() => handleTimelineSelect(timeline)}
                                                    className={`flex items-center justify-center cursor-pointer w-12 rounded-lg py-1 text-gray-500 transition-colors duration-300 ${selectedTimeline === timeline ? "bg-gray-600 text-white" : " text-gray-300"}`}
                                                >
                                                    {timeline}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                    : ''} 


                </div>
            </div>

            <div className="p-5 rounded-t-3xl bg-gray-50">
                <AssetList />
                <NFTList />
                <ProtocolsList />
            </div>
        </div>
    );
};

export default IndexPage;
