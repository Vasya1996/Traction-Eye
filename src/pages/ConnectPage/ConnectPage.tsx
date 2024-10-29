import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import Logo from "../IndexPage/TELogo.svg";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { postEvent, retrieveLaunchParams } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/api/api";
import { UserServiceApi } from "@/api/userServiceApi";
import { useInitData } from "@telegram-apps/sdk-react";
import { useSwipeable } from "react-swipeable";
import ScreenshotImage from "@/pages/ConnectPage/screenshots.png";
import { IoMdWallet } from "@/components/icons";
import "./ConnectPage.css"; // Импортируйте CSS файл
import { Spinner } from "@/components/ui/spinner";
import { LocalStorageKeys } from "@/constants/localStorage";
import { useQueryParams } from "@/hooks";


export const ConnectPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const userFriendlyAddress = useTonAddress();
    const navigate = useNavigate();
    const initData = useInitData();
    const queryParams = useQueryParams();
    const [walletAddress, setWalletAddress] = useState(() =>
        localStorage.getItem(LocalStorageKeys.user_service_wallet_address)
    );
    const isFirstLogin = localStorage.getItem(LocalStorageKeys.firstLogin) === "true";

    const { initDataRaw } = retrieveLaunchParams();

    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: (initData: string) => UserServiceApi.login(initData),
    });

    const addWalletMutation = useMutation({
        mutationFn: (params: { telegram_id: number; wallet_address: string }) =>
            API.addWallet(params.telegram_id, params.wallet_address),
        mutationKey: ["add-wallet"],
    });

    const userServiceAddWalletMutation = useMutation({
        mutationFn: ({
            walletAddress,
            referrer_link,
        }: {
            walletAddress: string;
            referrer_link?: string;
        }) => UserServiceApi.addWallet(walletAddress, referrer_link),
        mutationKey: ["user-service-add-wallet"],
    });

    const [tonConnectUI] = useTonConnectUI();
    const [isDisconnected, setIsDisconnected] = useState(false);
    
    useEffect(() => {
        const walletAddress = localStorage.getItem(LocalStorageKeys.user_service_wallet_address);
        if(!walletAddress && !isDisconnected && !isFirstLogin) {
            tonConnectUI?.disconnect();
            setIsDisconnected(true);
        } else {
            setIsDisconnected(true);
        }
    }, [isDisconnected])

    useEffect(() => {
        if (!userFriendlyAddress || !initDataRaw || !isDisconnected) {
            const timeoutId = setTimeout(() => {
                localStorage.removeItem(LocalStorageKeys.user_service_wallet_address);
                setWalletAddress(null); // Update the state after removal
            }, 5000);

            return () => clearTimeout(timeoutId); // Cleanup
        }

        (async () => {
            try {
                const {token} = await loginMutation.mutateAsync(initDataRaw);
                const firstLogin = localStorage.getItem(LocalStorageKeys.firstLogin)
                if(token && userFriendlyAddress === walletAddress && firstLogin === "true") {
                    navigate("/");
                    return;
                }
                localStorage.setItem(LocalStorageKeys.userServiceToken, token);
                const refCode = initData?.startParam;
                await Promise.all([
                    userServiceAddWalletMutation.mutateAsync({
                        walletAddress: userFriendlyAddress,
                        referrer_link: refCode 
                    }),
                    addWalletMutation.mutateAsync({
                        telegram_id: initData?.user?.id ? initData?.user?.id : 0,
                        wallet_address: userFriendlyAddress ?? walletAddress,
                    })
                ])
    
                localStorage.setItem(LocalStorageKeys.user_service_wallet_address, userFriendlyAddress);
                localStorage.setItem(LocalStorageKeys.firstLogin, "true")
                navigate("/");
            } catch(err) {
                console.log('--err',err);
            }
        })();
    }, [userFriendlyAddress, initDataRaw, walletAddress, tonConnectUI, isDisconnected, queryParams, initData]);

    const connectHandleClick = () => {
        postEvent("web_app_trigger_haptic_feedback", {
            type: "notification",
            notification_type: "warning",
        });
        tonConnectUI.openModal();
    };

    const handleNextSlide = () => {
        postEvent("web_app_trigger_haptic_feedback", {
            type: "impact",
            impact_style: "soft",
        });

        if (currentSlide < 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            connectHandleClick();
        }
    };

    const handlePreviousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentSlide(index);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleNextSlide(),
        onSwipedRight: () => handlePreviousSlide(),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <div {...handlers} className="connect-page h-screen flex flex-col p-4 pt-2 select-none overflow-hidden">
            <div className="flex-grow flex flex-col justify-center items-center max-w-md w-full mx-auto">
                <div className="text-center rounded-xl z-1 p-4 py-0 text-gray-300 flex flex-col items-center">
                    {currentSlide === 0 ? (
                        <div>
                            <span className="rounded-full bg-black flex items-center justify-center mb-2">
                                <img className="w-32 h-32" src={Logo} alt="Logo" />
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 mb-6 text-shadow-white">
                                Welcome to real Web3 vision of investing
                            </h2>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg font-black sm:text-xl lg:text-2xl text-shadow-white mb-1">
                                Analyse Profit and Loss <br /> of any kind of assets
                            </h3>
                            <div className="relative w-full max-w-xs h-auto mx-auto mb-0 mb-3 flex justify-center z-20">
                                <img className="w-full h-auto rounded-3xl object-cover" src={ScreenshotImage} alt="" />
                            </div>
                            <h3 className="text-md font-black text-shadow-white sm:text-md lg:text-xl mb-2">
                                All DeFi protocols on one screen
                            </h3>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-center mb-3">
                <button
                    disabled={!!walletAddress && isFirstLogin}
                    onClick={() => handleIndicatorClick(0)}
                    className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
                        currentSlide === 0 ? "bg-yellow-100" : "bg-gray-600"
                    }`}
                ></button>
                <button
                    disabled={!!walletAddress && isFirstLogin}
                    onClick={() => handleIndicatorClick(1)}
                    className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
                        currentSlide === 1 ? "bg-yellow-100" : "bg-gray-600"
                    }`}
                ></button>
            </div>

            <div className="flex-none flex justify-center pb-10 w-full">
                <button
                    disabled={!!walletAddress && isFirstLogin}
                    onClick={handleNextSlide}
                    className={`${
                        walletAddress ? "bg-yellow-500 cursor-not-allowed" : "bg-yellow-400"
                    } py-3 px-6 rounded-2xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex justify-center items-center text-base sm:text-lg`}
                >
                    {walletAddress && isFirstLogin ? (
                        <Spinner />
                    ) : (
                        <>
                            {currentSlide === 0 ? (
                                "Continue"
                            ) : (
                                <span className="flex items-center">
                                    Connect Wallet
                                    <IoMdWallet size={18} className="text-lg ml-2" />
                                </span>
                            )}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
