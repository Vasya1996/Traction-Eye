import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PiApproximateEqualsBold } from "react-icons/pi";
import Chart from "@/components/Chart";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { AssetItemProps } from "@/components/AssetItem";
import { MdOutlineInfo } from "react-icons/md";

const AssetItemPage: FC = () => {
  const params = useParams();
  const walletAdress = useTonAddress() || 'UQBghyYO1PSqiHO70FNCE5NpU94rTE3pfxjGpzB2aD6fWVCO';
  const location = useLocation();
  const state = location.state as AssetItemProps;

  const { data: chartData } = useQuery({
    queryKey: [params],
    queryFn: () => API.getChart(walletAdress, params.id!),
  });

  const { data: jettonData } = useQuery({
    queryKey: ['jettonData'],
    queryFn: () => API.getJettonInfo(walletAdress, params.id!),
  });

  return (
    <div className="h-screen bg-gray-800">
      <div className="h-56">
        <div className="hero px-3">
          <div className="userdata">
            <div className="flex items-center justify-center">
              <img
                className="h-6 w-6 mr-2"
                src={state.icon}
                alt=""
              />
              <div className="items-center">
                <p className="text-gray-300 text-sm font-semibold">{state.name}</p>
              </div>
            </div>
            <div className="mt-3 ml-2 text-center">
              <h1 className="text-4xl flex justify-center text-white font-semibold">
                {(state.amount).toFixed(2)}
                {/* Ensure that state.symbol is a valid property or remove it */}
              </h1>
              <span className="text-gray-400 justify-center items-center flex font-light text-sm gap-1">
                <PiApproximateEqualsBold /> ${(state.amount * state.price).toFixed(2)}
              </span>
              {jettonData?.pnl_percentage !== undefined && jettonData.pnl_percentage >= 0 ? (
                <span className="text-green-600">
                  +{jettonData.pnl_percentage.toFixed(2)}% (+${jettonData.pnl_usd})
                </span>
              ) : (
                <span>{jettonData?.pnl_percentage?.toFixed(2)}%</span>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-full">
          {chartData?.worth_chart ? <Chart worth_chart={chartData.worth_chart} /> : null}
        </div>
      </div>
      <div className="h-full bg-gray-50 rounded-t-3xl">
        <ul className="gap-3 p-7 text-base">
          <li className="flex justify-between mb-5">
            <div className="text-black font-semibold">Price</div>
            <div className="font-semibold text-gray-500">${state.price.toFixed(2)}</div>
          </li>
          <li className="flex justify-between mb-5">
            <div className="text-black font-semibold flex items-center ">
              Average price <MdOutlineInfo className="ml-1 text-gray-500" />
            </div>
            <div className="font-semibold text-gray-500">${jettonData?.average_price}</div>
          </li>
          <li className="flex justify-between mb-5">
            <div className="text-black font-semibold flex items-center ">
              Commissions <MdOutlineInfo className="ml-1 text-gray-500" />
            </div>
            <div className="font-semibold text-gray-500">${jettonData?.commisions}</div>
          </li>
          <li className="flex justify-between mb-5">
            <div className="text-black font-semibold flex items-center ">
              Market Cap <MdOutlineInfo className="ml-1 text-gray-500" />
            </div>
            <div className="font-semibold text-gray-500">$18.19B</div>
          </li>
        </ul>
        <span className="w-full border-b"></span>
      </div>
    </div>
  );
};

export default AssetItemPage;
