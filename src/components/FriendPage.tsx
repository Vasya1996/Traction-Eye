import { retrieveLaunchParams, useBackButton } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import AssetList from "./AssetList";
import NFTList from "./NFTList";
import { ProtocolsList } from "./ProtocolList";
import { ChartHome } from "./ChartHome";
import { TimelineToolbar } from "./TImelineToolbar";
import { TimelineKeys, TIMELINES_INTERVALS_SECONDS } from "@/constants";
import { Logo } from "./icons";
import { shortenWallet } from "@/pages/IndexPage/IndexPage";
import { useAuthStore } from "@/store/store";
import { useNavigate } from "react-router-dom";

const FriendPage = () => {
	const { initData } = retrieveLaunchParams();
	const [friendWalletAddress, setFriendWalletAddress] = useState("");
	const bb = useBackButton();
	const navigate = useNavigate();
	const { isAuthenticated, setIsFromRefLink, isFromRefLink } = useAuthStore();

	useEffect(() => {
		const friendWalletAddress = initData?.startParam?.split("__wallet=")[1];
		if (friendWalletAddress) {
			setFriendWalletAddress(friendWalletAddress);
		}
	}, [initData]);

	const [selectedTimeline, setSelectedTimeline] = useState<
		keyof typeof TIMELINES_INTERVALS_SECONDS
	>(TimelineKeys.Month);

	useEffect(() => {
		if (bb) {
			bb.show();
			if (isAuthenticated) {
				bb.on("click", () => {
          if (!isFromRefLink) {
            setIsFromRefLink(true);
          }      
					navigate("/");
				});
			}
		}
	}, [bb]);

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
								{shortenWallet(friendWalletAddress)}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-auto mb-4">
				<ChartHome
					friendWalletAddress={friendWalletAddress}
					timeline={selectedTimeline}
				/>
				<TimelineToolbar
					friendWalletAddress={friendWalletAddress}
					onTimelineSelect={handleTimelineSelect}
				/>
			</div>
			<div
				style={{ minHeight: "60vh", height: "100%" }}
				className="p-5 rounded-t-3xl bg-gray-50 pb-32"
			>
				<AssetList friendWalletAddress={friendWalletAddress} />
				<NFTList friendWalletAddress={friendWalletAddress} />
				<ProtocolsList friendWalletAddress={friendWalletAddress} />
			</div>
		</div>
	);
};

export default FriendPage;
