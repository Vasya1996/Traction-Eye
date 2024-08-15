import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import Logo from "../IndexPage/TELogo.svg";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { postEvent } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useInitData } from "@telegram-apps/sdk-react";
import { useSwipeable } from "react-swipeable"; 
import ScreenshotImage from '@/pages/ConnectPage/screenshots.jpg';
import { IoMdWallet } from "react-icons/io";

export const ConnectPage = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const userFriendlyAddress = useTonAddress();
	const navigate = useNavigate();
	const initData = useInitData();

	const mutation = useMutation({
		mutationFn: (params: { telegram_id: number; wallet_address: string }) =>
			API.addWallet(params.telegram_id, params.wallet_address),
		mutationKey: ["add-wallet"],
		onSettled: () => {
			navigate("/");
		},
	});

	useEffect(() => {
		if (!userFriendlyAddress) return;
		mutation.mutate({
			telegram_id: initData?.user?.id ? initData?.user?.id : 0,
			wallet_address: userFriendlyAddress,
		});
	}, [userFriendlyAddress]);

	const [tonConnectUI] = useTonConnectUI();

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

	const handlers = useSwipeable({
		onSwipedLeft: () => handleNextSlide(),
		onSwipedRight: () => handlePreviousSlide(),
		preventScrollOnSwipe: true, 
		trackMouse: true,
	});

	return (
		<div {...handlers} className="h-screen flex flex-col bg-black p-4 pt-2 select-none overflow-y-hidden">
			{/* Content container */}
			<div className="flex-grow flex flex-col justify-center items-center max-w-md w-full mx-auto">
				<div className="text-center rounded-xl p-4 py-0 text-gray-300 flex flex-col items-center">
					{currentSlide === 0 ? (
						<div>
							<span className="rounded-full bg-black flex items-center justify-center mb-2">
								<img className="w-32 h-32" src={Logo} alt="Logo" />
							</span>
							<h2 className="font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 mb-6">
								Welcome to real web3 vision of investing
							</h2>
						</div>
					) : (
						<>
							<h3 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-2">
								Analyse Profit and Loss <br/> of any kind of assets
							</h3>
							<div className="relative w-full max-w-xs h-auto mx-auto mb-0 mb-3">
								<img className="w-full h-62 " src={ScreenshotImage} alt="" />
							</div>
							<h3 className="text-lg font-semibold sm:text-xl lg:text-2xl mb-3">
								All DeFi protocols on one screen
							</h3>
						</>
					)}
				</div>
			</div>

			{/* Slide indicators */}
			<div className="flex justify-center mb-3">
				<span className={`w-2 h-2 mx-1 rounded-full ${currentSlide === 0 ? 'bg-yellow-300' : 'bg-gray-600'}`}></span>
				<span className={`w-2 h-2 mx-1 rounded-full ${currentSlide === 1 ? 'bg-yellow-300' : 'bg-gray-600'}`}></span>
			</div>

			{/* Button container */}
			<div className="flex-none flex justify-center pb-10 w-full">
				<button
					onClick={handleNextSlide}
					className="bg-yellow-400 py-3 px-6 rounded-2xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex justify-center items-center text-base sm:text-lg"
				>
					{currentSlide === 0 ? "Continue" : <span className="flex items-center">Connect Wallet<IoMdWallet className="text-lg ml-2"/></span>}
				</button>
			</div>
		</div>
	);
};
