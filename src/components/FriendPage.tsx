import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import AssetList from "./AssetList";
import NFTList from "./NFTList";
import { ProtocolsList } from "./ProtocolList";

const FriendPage = () => {
	const { initData } = retrieveLaunchParams();
	const [friendWalletAdress, setFriendWalletAdress] = useState("");

	useEffect(() => {
		const friendWalletAdress = initData?.startParam?.split("__wallet=")[1];
		if (friendWalletAdress) {
			setFriendWalletAdress(friendWalletAdress);
		}
	}, [initData]);

	return (
		<div className="bg-gray-800 min-h-screen select-none overflow-hidden">
			<div
				style={{ minHeight: "60vh", height: "100%" }}
				className="p-5 rounded-t-3xl bg-gray-50 pb-32"
			>
				<AssetList friendWalletAddress={friendWalletAdress} />
				<NFTList />
				<ProtocolsList />
			</div>
		</div>
	);
};

export default FriendPage;
