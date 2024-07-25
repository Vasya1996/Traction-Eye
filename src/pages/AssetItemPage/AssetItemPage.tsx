import { FC } from "react";

import { useLocation, useParams } from "react-router-dom";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Chart from "@/components/Chart";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { AssetItemProps } from "@/components/AssetItem";

const AssetItemPage: FC = () => {
	const params = useParams();
  const walletAdress = useTonAddress() || 'UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO';
  const location = useLocation();

  const state = location.state as AssetItemProps;

  const {data: chartData} = useQuery({
    queryKey: [params],
    queryFn: () => API.getChart(walletAdress, params.id!),
  })

  const {data: jettonData} = useQuery({
    queryKey: ['jettonData'],
    queryFn: () => API.getJettonInfo(walletAdress, params.id!),
  })

  console.log(jettonData);

	return (
		<div className="h-screen bg-gray-800">
			<div className="hero h-56 px-3">
				<div className="userdata">
					<div className="flex items-center">
						<img
							className="h-6 w-6 mr-3"
							src={state.icon}
							alt=""
						/>
						<div className="mr-2 items=center">
							<p className="text-gray-300 font-semibold">{state.name}</p>
						</div>
						<MdOutlineKeyboardArrowRight className="text-zinc-400 my-auto size-5" />
					</div>
          <div className="max-w-full mt-14">
							{chartData?.worth_chart ? <Chart worth_chart={chartData?.worth_chart} /> : null}
					</div>
          <div>
            <h1>{jettonData?.pnl_usd}$</h1>
            <h2>{jettonData?.pnl_percentage}%</h2>
          </div>
				</div>
			</div>
		</div>
	);
};

export default AssetItemPage;
