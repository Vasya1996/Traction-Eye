import { FC } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import STONLogo from "@/pages/IndexPage/stonfilogo.jpg";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";

const LiquidityPool: FC = () => {
	const userFriendlyAddress =
		useTonAddress() || "UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO";

	const { data } = useQuery({
		queryFn: () => API.getStonfiInfo(userFriendlyAddress),
		queryKey: ["stonfi"],
	});

	const suppliedTokens = data?.supplied;
	const rewardedTokens = data?.rewards;
	console.log(suppliedTokens);
	return (
		<div>
			<div className="flex justify-between items-center my-4">
				<div className="flex items-center">
					<img
						src={STONLogo}
						alt="STON.fi"
						className="rounded-lg h-8 w-8 mr-2"
					/>
					<p className="font-semibold text-xl">STON.fi</p>
				</div>
				<button className="text-blue-800 px-3 py-1 bg-gray-200 rounded-lg flex items-center">
					LP analytics <MdOutlineKeyboardArrowRight />
				</button>
			</div>
			<div className="p-4 bg-white rounded-lg shadow-md">
				<div className="">
					<div className="flex justify-between items-center">
						<p className="text-blue-500 bg-blue-100 rounded-full px-4 py-1 h-8">
							Liquidity Pool
						</p>
						<p className="text-2xl font-bold mt-2">${data?.usd_sum}</p>
					</div>
					<div className="mt-4">
						<div className="grid grid-cols-3 text-gray-500 text-xs">
							<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
								SUPPLIED
							</p>
							<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
								AMOUNT
							</p>
							<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-end">
								USD VALUE
							</p>
						</div>
						{suppliedTokens?.map((token) => (
							<div
								className="flex justify-between items-center mt-2"
								key={token.token_name}
							>
								<div className="flex items-center col-span-1">
									<img
										src={token.token_image_url}
										alt={token.token_name}
										className="h-6 w-6 mr-2"
									/>
									<span className="text-black">{token.token_name}</span>
								</div>
								<p className="col-span-1 flex justify-start text-black">
									{(+token?.amount / Math.pow(10, +token.decimals)).toFixed(2)}
								</p>
								<p className="col-span-1 text-black">{token.usd_value}$</p>
							</div>
						))}
					</div>
					{rewardedTokens?.length ? (
						<div className="mt-4">
							<div className="grid grid-cols-3 text-gray-500 text-xs">
								<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
									Rewarded
								</p>
								<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">
									AMOUNT
								</p>
								<p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-end">
									USD VALUE
								</p>
							</div>
							{rewardedTokens?.map((token) => (
								<div
									className="flex justify-between items-center mt-2"
									key={token.token_name}
								>
									<div className="flex items-center col-span-1">
										<img
											src={token.token_image_url}
											alt={token.token_name}
											className="h-6 w-6 mr-2"
										/>
										<span className="text-black">{token.token_name}</span>
									</div>
									<p className="col-span-1 flex justify-start text-black">
										{(+token?.amount / Math.pow(10, +token.decimals)).toFixed(
											2
										)}
									</p>
									<p className="col-span-1 text-black">{token.usd_value}$</p>
								</div>
							))}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default LiquidityPool;
