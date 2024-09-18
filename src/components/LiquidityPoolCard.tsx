import { FC, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import dedustLogo from "@/pages/IndexPage/dedustlogo.png";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import { postEvent } from "@telegram-apps/sdk";
import { useStore } from "@/store/store";
import { formatNumber } from "@/utils";

interface LiquidityPoolCardProps {
  poolName: "dedust" | "stonfi";
}

const handlePremiumClick = () => {
	postEvent("web_app_trigger_haptic_feedback", {
		type: "impact",
		impact_style: "medium",
	});
	};

	const LiquidityPool: FC<LiquidityPoolCardProps> = ({ poolName }) => {
	const userFriendlyAddress = useTonAddress();
  const { incrementNetWorth, hasFetchedDedust, hasFetchedStonfi, setHasFetchedDedust, setHasFetchedStonfi } = useStore();

	const poolQueryFn =
		poolName === "dedust" ? API.getDedustInfo : API.getStonfiInfo;
	const icon = poolName === "dedust" ? dedustLogo : STONLogo;

	const { data } = useQuery({
		queryFn: () => poolQueryFn(userFriendlyAddress),
		queryKey: [poolName],
    staleTime: Infinity,
	});

  const hasFetchedLP = poolName === "dedust" ? hasFetchedDedust : hasFetchedStonfi;
  const setHasFetchedLP = poolName === "dedust" ? setHasFetchedDedust : setHasFetchedStonfi;

  useEffect(() => {
    if (data && !hasFetchedLP) {
      const totalUsdSum = data?.reduce((accumulator, item) => {
        return accumulator + (+item?.usd_sum || 0);
      }, 0);  
      incrementNetWorth(totalUsdSum);
      setHasFetchedLP(true);
    }
  }, [data])

  
	if (!data || data.length === 0) {
		return null;
	}

	return (
		<div>
		<div className="flex justify-between items-center my-4">
			<div className="flex items-center">
			<img src={icon} alt={poolName} className="rounded-lg h-8 w-8 mr-2" />
			<p className="font-semibold text-xl capitalize">{poolName}</p>
			</div>
			{/* <Link
			to={'premium'}
			onClick={handlePremiumClick}
			className="text-blue-800 px-3 py-1 bg-gray-200 rounded-lg flex items-center"
			>
			LP analytics <MdOutlineKeyboardArrowRight />
			</Link> */}
		</div>
		<div className="p-4 bg-white rounded-2xl shadow-md">
			{data.map((lp, index) => (
			<div key={index} className="mb-2">
				<div className="flex justify-between items-center">
				<p className="text-blue-500 bg-blue-100 rounded-full px-4 py-1 h-8">
					Liquidity Pool
				</p>
				<p className="text-2xl font-bold mt-2">
					{formatNumber(parseFloat(lp.usd_sum), false)}$
				</p>
				</div>
				<div className="mt-4">
				<div className="grid grid-cols-3 text-gray-500 text-xs">
					<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					SUPPLIED
					</p>
					<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
					AMOUNT
					</p>
					<p className="py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
					USD VALUE
					</p>
				</div>
				{lp.supplied
					.filter(token => parseFloat(token.usd_value) > 0) // Filter tokens with USD value > 0
					.sort((a, b) => parseFloat(b.usd_value) - parseFloat(a.usd_value)) // Sort by USD value in descending order
					.map((token) => (
					<div
						className="flex justify-between items-center mt-2"
						key={token.token_name}
					>
						<div className="flex items-center w-1/3">
						<img
							src={token.token_image_url}
							alt={token.token_name}
							className="h-6 w-6 mr-2 rounded-full"
						/>
						<span className="text-black">{token.token_name}</span>
						</div>
						<p className="w-1/3 pl-3 text-left text-black">
						{(
							+token.amount / Math.pow(10, +token.decimals)
						).toFixed(2)}
						</p>
						<p className="w-1/3 text-right text-black">
						{formatNumber(parseFloat(token.usd_value))}$
						</p>
					</div>
					))}
				<div className="mt-4">
					<div className="grid grid-cols-3 text-gray-500 text-xs">
					<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Rewarded
					</p>
					<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						AMOUNT
					</p>
					<p className="py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
						USD VALUE
					</p>
					</div>
					{lp.rewards
					.filter(token => parseFloat(token.usd_value) > 0) // Filter tokens with USD value > 0
					.sort((a, b) => parseFloat(b.usd_value) - parseFloat(a.usd_value)) // Sort by USD value in descending order
					.map((token) => (
						<div
						className="flex justify-between items-center mt-2"
						key={token.token_name}
						>
						<div className="flex items-center w-1/3">
							<img
							src={token.token_image_url}
							alt={token.token_name}
							className="h-6 w-6 mr-2 rounded-full"
							/>
							<span className="text-black">{token.token_name}</span>
						</div>
						<p className="w-1/3 pl-3 text-left text-black">
							{(
							+token.amount / Math.pow(10, +token.decimals)
							).toFixed(2)}
						</p>
						<p className="w-1/3 text-right text-black">
							{formatNumber(parseFloat(token.usd_value))}$
						</p>
						</div>
					))}
				</div>
				</div>
			</div>
			))}
		</div>
		</div>
	);
};

export default LiquidityPool;
