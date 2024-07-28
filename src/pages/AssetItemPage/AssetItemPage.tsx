import { FC, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PiApproximateEqualsBold } from "react-icons/pi";
import Chart from "@/components/Chart";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { AssetItemProps } from "@/components/AssetItem";
import { MdOutlineInfo } from "react-icons/md";
import { postEvent } from '@telegram-apps/sdk';

const AssetItemPage: FC = () => {
  const [tooltip, setTooltip] = useState<null | string>(null);
  const [blur, setBlur] = useState<boolean>(false);

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

  const toggleTooltip = (key: string) => {
    postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'light' });

    setTooltip(key);
    setTimeout(() => {
      setTooltip(null);
    }, 5000);
  };

  return (
    <div className={`h-screen bg-gray-800 ${blur ? 'blur-sm' : ''}`}>
      <div className="h-56">
        <div className="hero px-3">
          <div className="userdata">
            <div className="flex items-center justify-start">
              <img
                className="h-11 w-11 mr-2"
                src={state.icon}
                alt=""
              />
              <div className="items-center">
                <p className="text-gray-300 text-sm font-semibold">{state.name}</p>
                <div className="flex items-center items-center">
                  <h1 className="text-xl flex justify-start text-white font-semibold">
                    {(state.amount).toFixed(2)}
                  </h1>

                  <span className="text-gray-400 justify-center items-center flex font-light text-sm">
                    <PiApproximateEqualsBold className="mx-1" /> ${(state.amount * state.price).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex-grow flex justify-end">
                {jettonData?.pnl_percentage !== undefined ? (
                  jettonData.pnl_percentage >= 0 ? (
                    <span className="text-green-600 flex items-center justify-end">
                      +{jettonData.pnl_percentage.toFixed(2)}% (${jettonData.pnl_usd})
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center justify-end">
                      -{jettonData.pnl_percentage.toFixed(2)}% (${jettonData.pnl_usd})
                    </span>
                  )
                ) : (
                  <span className="text-gray-400 flex items-center justify-end">
                    Loading...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-full mt-10">
          {chartData?.worth_chart ? <Chart worth_chart={chartData.worth_chart} /> : null}
        </div>
      </div>

      <div className="h-full bg-gray-50 rounded-t-3xl relative">
        <ul className="gap-3 p-7 text-base">
          <li className="flex justify-between mb-5">
            <div className="text-black font-semibold">Price</div>
            <div className="font-semibold text-gray-500">${state.price.toFixed(2)}</div>
          </li>
          <li className="flex justify-between mb-5 relative">
            <div className="text-black font-semibold flex items-center ">
              Average price <MdOutlineInfo className="ml-1 text-gray-500 cursor-pointer" onClick={() => toggleTooltip('averagePrice')} />
              {tooltip === 'averagePrice' && (
                <div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
                  The average price is the mean price of the asset over a certain period.
                </div>
              )}
            </div>
            <div className="font-semibold text-gray-500">${jettonData?.average_price ?? 'Loading...'}</div>
          </li>
          <li className="flex justify-between mb-5 relative">
            <div className="text-black font-semibold flex items-center ">
              Commissions <MdOutlineInfo className="ml-1 text-gray-500 cursor-pointer" onClick={() => toggleTooltip('commissions')} />
              {tooltip === 'commissions' && (
                <div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
                  Commissions are fees charged for transactions.
                </div>
              )}
            </div>
            <div className="font-semibold text-gray-500">${jettonData?.commisions ?? 'Loading...'}</div>
          </li>
          <li className="flex justify-between mb-5 relative">
            <div className="text-black font-semibold flex items-center ">
              Market Cap <MdOutlineInfo className="ml-1 text-gray-500 cursor-pointer" onClick={() => toggleTooltip('marketCap')} />
              {tooltip === 'marketCap' && (
                <div className="absolute bg-black bg-opacity-75 backdrop-blur-md p-3 shadow-md rounded-xl mt-2 text-white z-10 font-light">
                  Market Cap is the total market value of a company's outstanding shares.
                </div>
              )}
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
