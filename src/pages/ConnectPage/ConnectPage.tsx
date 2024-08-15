import { useEffect } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import Logo from "../IndexPage/TELogo.svg";
import { useTonConnectUI } from '@tonconnect/ui-react';
import { postEvent } from '@telegram-apps/sdk';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useInitData } from "@telegram-apps/sdk-react";

export const ConnectPage = () => {
	const userFriendlyAddress = useTonAddress();
	const navigate = useNavigate();
  const initData = useInitData();

  const mutation = useMutation(
    {
      mutationFn: (params: {telegram_id: number, wallet_address: string}) => API.addWallet(params.telegram_id, params.wallet_address),
      mutationKey: ['add-wallet'],
      onSuccess: () => {
		navigate("/");
      }
    }
  );

	useEffect(() => {
		if (!userFriendlyAddress) return;
		mutation.mutate({telegram_id: initData?.user?.id ? initData?.user?.id : 0, wallet_address: userFriendlyAddress })
	}, [userFriendlyAddress]);

	const [tonConnectUI] = useTonConnectUI();

	const connectHandleClick = () => {
		postEvent('web_app_trigger_haptic_feedback', { type: 'notification', notification_type: 'warning' });
		tonConnectUI.openModal();
	};

	return (
		<div className="h-screen flex flex-col bg-black p-4">
			{/* Content container at the top */}
			<div className="flex-grow flex flex-col justify-center items-center max-w-md w-full mx-auto mb-4">
				<div className="text-center bg-zinc-900 rounded-xl p-4 text-gray-300 flex flex-col items-center">
					<div className="logo-name mb-4 flex flex-col items-center">
						<span className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-3">
							<img className="text-yellow-300 h-8 p-1" src={Logo} alt="Logo" />
						</span>
						<h2 className="font-bold text-xl sm:text-2xl">Traction Eye</h2>
					</div>

					<h3 className="text-lg sm:text-xl mb-3">Universal toolbar for investors</h3>

					<div className="text-base mt-2 mb-4">
						<div className="mb-6">
							<span className="text-4xl sm:text-5xl">💸</span>
							<p className="mt-1 text-sm sm:text-base">
								Analyse PnL and profitability of DeFi protocols on one screen
							</p>
						</div>

						<div>
							<span className="text-4xl sm:text-5xl">📊</span>
							<p className="mt-1 text-sm sm:text-base">
								Track the onchain activity of influencers you trust and earn with
								them
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Button container at the bottom */}
			<div className="flex-none sticky bottom-0 flex justify-center mt-auto pb-4 w-full">
				<button 
					onClick={connectHandleClick} 
					className="bg-yellow-400 py-4 px-8 rounded-2xl w-full sm:w-3/4 md:w-1/2 lg:w-40 flex justify-center items-center text-base sm:text-lg"
				>
					Connect Wallet
				</button>
			</div>
		</div>
	);
};
