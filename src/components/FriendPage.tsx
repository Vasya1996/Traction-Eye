import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import AssetList from "./AssetList";
import NFTList from "./NFTList";
import { ProtocolsList } from "./ProtocolList";
import { ChartHome } from "./ChartHome";
import { TimelineToolbar } from "./TImelineToolbar";
import { TimelineKeys, TIMELINES_INTERVALS_SECONDS } from "@/constants";
import { Logo } from "./icons";
import { shortenWallet } from "@/pages/IndexPage/IndexPage";

const FriendPage = () => {
	const { initData } = retrieveLaunchParams();
	const [friendWalletAdress, setFriendWalletAdress] = useState("");

	useEffect(() => {
		const friendWalletAdress = initData?.startParam?.split("__wallet=")[1];
		if (friendWalletAdress) {
			setFriendWalletAdress(friendWalletAdress);
		}
	}, [initData]);

	const [selectedTimeline, setSelectedTimeline] = useState<
		keyof typeof TIMELINES_INTERVALS_SECONDS
	>(TimelineKeys.Month);

	const handleTimelineSelect = (
		timeline: keyof typeof TIMELINES_INTERVALS_SECONDS
	) => {
		setSelectedTimeline(timeline);
	};

	return (
		<div className="bg-gray-800 min-h-screen select-none overflow-hidden">
			<div className="hero flex flex-col">
				<div className="userdata px-4 flex justify-between items-center mt-1">
					<div className="flex items-center">
						<Logo className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3" />
						<div className="items-center">
							<p className="text-gray-400 font-light">
								{shortenWallet(friendWalletAdress)}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-auto mb-4">
				<ChartHome
					friendWalletAdress={friendWalletAdress}
					timeline={selectedTimeline}
				/>
				<TimelineToolbar
					friendWalletAdress={friendWalletAdress}
					onTimelineSelect={handleTimelineSelect}
				/>
			</div>
			<div
				style={{ minHeight: "60vh", height: "100%" }}
				className="p-5 rounded-t-3xl bg-gray-50 pb-32"
			>
				<AssetList friendWalletAddress={friendWalletAdress} />
				<NFTList friendWalletAddress={friendWalletAdress} />
				<ProtocolsList friendWalletAdress={friendWalletAdress} />
			</div>
		</div>
	);
};

export default FriendPage;
