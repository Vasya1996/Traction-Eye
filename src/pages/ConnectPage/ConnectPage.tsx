import { useEffect, type FC } from "react";
import { useTonAddress } from "@tonconnect/ui-react";

import Logo from "./Logo.svg";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";

export const ConnectPage: FC = () => {
	const userFriendlyAddress = useTonAddress();
  const navigate = useNavigate();

	useEffect(() => {
    alert("ВРЕМЕННО: кошелек подключен, редирект на мейн");
    setTimeout(() => {
      navigate("/");
    }, 2000)
  }, [userFriendlyAddress])

	return (
		<div className="h-screen p-4 bg-black  justify-center items-center">
			<div className="txt text-center h-5/6 bg-zinc-900 rounded-lg p-5 text-gray-300 flex flex-col items-center">
				<div className="logo-name mb-2 flex flex-col items-center">
					<span className="w-24 h-24 rounded-full bg-black flex items-center justify-center mb-3">
						<img className=" text-yellow-300 h-10" src={Logo} alt="" />
					</span>
					<h2 className="font-bold text-lg">Traction Eye</h2>
				</div>

				<h3 className="text-l">Universal toolbar for investors</h3>

				<div className="mt-4 text-left">
					<div className="flex items-baseline gap-x-2">
						<span className="mx-auto text-base">💸</span>
						<p className="mb-4 text-sm">
							Analyse PnL and profitability of DeFi protocols on one screen
						</p>
					</div>
					<div className="flex items-baseline gap-x-2">
						<span className="mx-auto text-base">📊</span>
						<p className="text-sm">
							Track the onchain activity of influencers you trust and earn with
							them
						</p>
					</div>
				</div>
			</div>
			<TonConnectButton className="mx-auto mt-4 w-full" />
			{/* <button
				onClick={handleClick}
				className="flex w-full justify-center bg-yellow-400 p-3 rounded-xl text-black mt-5"
			>
				Connect with Wallet
			</button> */}
		</div>
	);
};
