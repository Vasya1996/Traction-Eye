import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import logo from "../image/tractionEye.svg";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { manifestFile } from "../App";

import { shortenWallet } from '../components/utilities';
import elipse from "../image/Ellipse 7.png";
import tonSymbol from '../image/ton_symbol.svg';
import { FaClipboardList } from "react-icons/fa";
import { initCloudStorage } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { PiApproximateEqualsBold } from "react-icons/pi";



import { IoAnalyticsOutline } from "react-icons/io5";
import { IoIosArrowForward } from 'react-icons/io';
import { RiNftLine } from "react-icons/ri";

export default function AssetDetails() {
  const [data, setData] = useState([]);
  const userFriendlyAddress = useTonAddress();
  const [assets, setAssets] = useState([]);
  const [nfts, setNFTS] = useState([]);
  const [walletInfo, setWalletInfo] = useState(null);
  const cloudStorage = initCloudStorage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleAssets, setVisibleAssets] = useState(5);
  const [totalBalance, setTotalBalance] = useState(0); // State для общего баланса
  const [LPStonFi, setLPStonFi ] = useState([]);

  const showMore = () => {
    setVisibleAssets(prev => prev + 5);
  };


  useEffect(() => {
    const fetchNFT = async (userFriendlyAddress) => {
      const API_TE_URL = 'https://facegame.tw1.ru';
      try {
        const response = await axios.post(`${API_TE_URL}/nfts_by_wallet/`, {
          wallet_address: userFriendlyAddress
        });

        if (!response.data) {
          throw new Error('Failed to fetch NFTs');
        }

        if (Array.isArray(response.data.nfts)) {
          setNFTS(response.data.nfts);
        } else {
          console.error('NFTs data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch NFTs:', error);
      }
    };

    if (userFriendlyAddress) {
      fetchNFT(userFriendlyAddress);
    }
  }, [userFriendlyAddress]);

  // Fetch Liquid Pools
  useEffect(() => {
    const fetchLPStonFi = async (userFriendlyAddress) => {
      const API_TE_URL = 'https://facegame.tw1.ru';
      try {
        const response = await axios.post(`${API_TE_URL}/stonfi_info/`, {
          wallet_address:userFriendlyAddress
        });

        if (Array.isArray(response.data)) {
          setLPStonFi(response.data);

        } else {
          console.error('LP data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch LP StonFi:', error);
      }
    };

    if (userFriendlyAddress) {
      fetchLPStonFi(userFriendlyAddress);
      console.log(LPStonFi);
    }
  }, [userFriendlyAddress]);

  // Fetch Assets
  useEffect(() => {
    const fetchAssets = async (userFriendlyAddress) => {
      const API_TE_URL = 'https://facegame.tw1.ru';
      try {
        const response = await axios.post(`${API_TE_URL}/assets_by_wallet/`, {
          wallet_address:userFriendlyAddress
        });

        if (Array.isArray(response.data.assets)) {
          setAssets(response.data.assets);
          calculateTotalBalance(response.data.assets); // Вызов функции для расчета общего баланса
        } else {
          console.error('Assets data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch assets:', error);
      }
    };

    if (userFriendlyAddress) {
      fetchAssets(userFriendlyAddress);
    }
  }, [userFriendlyAddress]);

  useEffect(() => {
    cloudStorage
      .get("wallets")
      .then((res) => {
        if (res) {
          const wallet = JSON.parse(res);
          if (wallet && Object.keys(wallet).length > 0) {
            setWalletInfo(wallet);
          } else {
            navigate("/connect");
          }
        } else {
          navigate("/connect");
        }
      })
      .catch(() => {
        navigate("/connect");
      });
  }, [cloudStorage, navigate]);

  function generateDataset() {
    const dataset = [];
    for (let i = 1; i <= 100; i++) {
      const value = Math.floor(Math.random() * 10) + 1;
      dataset.push({
        days: `Day ${i}`,
        value: value,
      });
    }
    return dataset;
  }

  useEffect(() => {
    const generatedData = generateDataset();
    setData(generatedData);
  }, []);

  // Total Balance
  const calculateTotalBalance = (assets) => {
    let total = 0;
    assets.forEach(asset => {
      total += (asset.amount / 10**9) * asset.price_usd;
    });
    setTotalBalance(total.toFixed(2)); // Задаем общий баланс с округлением до двух знаков после запятой
  };

  // const renderNFTs = () => {
  //   if (nfts.length === 0) {
  //     return <span className="mt-14 text-xl font-semibold text-gray-400">You have no NFTs ;(</span>;
  //   } else {
  //     return nfts.map((nft, index) => (
  //       <div key={index}>
  //         <p>{nft.name}</p>
  //         <p>{nft.description}</p>
  //         {nft.image_url && <img src={nft.image_url} alt={nft.name} />}
  //       </div>
  //     ));
  //   }
  // };


  return (
    <div className="h-screen overflow-visible w-full bg-gray-700">
    <div className="h-2/5 flex flex-col justify-between pt-5 ">
      <div className="flex flex-col items-start gap-4 px-8 ">
        <div className="flex">
        <IoIosArrowForward onClick={() => navigate("/")} className="center text-gray-400 text-center justify-center flex my-auto size-6 rotate-180 mr-4" />
        <div className="flex flex-row cursor-pointer items-center gap-2">

          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black">
            <img src={tonSymbol} alt="logo" className="h-8 w-8 " />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-300 text-xl">Toncoin</span>
          </div>
        </div>
                </div>
        <div className="flex flex-col">
          <span className="font-semibold text-4xl text-white">1.32 TON</span>
          <span className="flex text-gray-100"><PiApproximateEqualsBold className="mr-1 text-gray-100 my-auto"/> $9.32</span>
          <span className="text-md text-green-600 font-bold">+0.12% ($0)</span>
        </div>
      </div>
      <div className="h-2/6 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Area type="monotone" dataKey="value" stroke="#43A047" fill="#43A047" opacity={0.4} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="flex flex-col min-h-3/5 bg-slate-100 h-full rounded-t-3xl px-5 pt-8">

    {/* Asset info */}
    <div className="gap-5 mb-8">
      <div className="flex justify-between px-2 mb-3">
        <span className="font-semibold text-xl">Price</span>
        <span className="font-bold text-gray-700">$9.32</span>
      </div>

      <div className="flex justify-between px-2 mb-3">
        <span className="font-semibold text-xl">Average Price</span>
        <span className="font-bold text-gray-500">$10.01</span>
      </div>

      <div className="flex justify-between px-2 mb-3">
        <span className="font-semibold text-xl">Comissions</span>
        <span className="font-bold text-gray-500">$0.2</span>
      </div>

      <div className="flex justify-between px-2">
        <span className="font-semibold text-xl">Market Cap</span>
        <span className="font-bold text-gray-500">$18.19B</span>
      </div>
    </div>

    <div className="bg-gray-300 h-px">
      <span className=""></span>
    </div>

      {/* Tools */}
      <div className="tools-part mt-4">
        <div className="tools-header flex items-center mb-5">
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <img src="https://static.ston.fi/favicon/android-chrome-512x512.png" alt="STON.fi Logo" className="w-8 h-8 mr-2" />
            <span className="font-bold text-lg">STON.fi</span>
          </div>
        </div>
        <div className="tool-card bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-blue-500 bg-blue-100 px-3 py-1 rounded-full">Liquidity Pool</span>
            <span className="text-lg font-bold">$16.51</span>
          </div>
          <div className="tool-body p-4 rounded-lg">
            <div className="flex justify-between text-gray-400 font-semibold mb-2">
              <span className="w-1/3">Supplied</span>
              <span className="w-1/3 text-center">Amount</span>
              <span className="w-1/3 text-right">USD Value</span>
            </div>
            <div className="tool-supplied mb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center w-1/3  p-2 rounded-full ">
                  <img src={tonSymbol} alt="Toncoin" className="w-6 h-6 mr-2" />
                  <span className="font-bold text-gray-600">Toncoin</span>
                </div>
                <div className="text-center w-1/3">
                  <span className="block text-gray-700">0.0025</span>
                </div>
                <div className="text-right w-1/3">
                  <span className="text-gray-700">$8.26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  );
};
