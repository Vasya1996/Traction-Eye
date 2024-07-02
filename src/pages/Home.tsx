import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import logo from "../image/tractionEye.svg";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { manifestFile } from "../App";

import { shortenWallet } from "../components/utilities";
import elipse from "../image/Ellipse 7.png";
import tonSymbol from "../image/ton_symbol.svg";
import nftImg from "../assets/nft.avif";
import { FaClipboardList } from "react-icons/fa";
import { initCloudStorage } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { IoAnalyticsOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { RiNftLine } from "react-icons/ri";

export default function Home() {
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
  const [LPStonFi, setLPStonFi] = useState([]);

  const showMore = () => {
    setVisibleAssets((prev) => prev + 5);
  };

  useEffect(() => {
    const fetchNFT = async (userFriendlyAddress: string) => {
      const API_TE_URL = "https://facegame.tw1.ru";
      try {
        const response = await axios.post(`${API_TE_URL}/nfts_by_wallet/`, {
          wallet_address: userFriendlyAddress,
        });

        if (!response.data) {
          throw new Error("Failed to fetch NFTs");
        }

        if (Array.isArray(response.data.nfts)) {
          setNFTS(response.data.nfts);
        } else {
          console.error("NFTs data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      }
    };

    if (userFriendlyAddress) {
      fetchNFT(userFriendlyAddress);
    }
  }, [userFriendlyAddress]);

  // Fetch Liquid Pools
  useEffect(() => {
    const fetchLPStonFi = async (userFriendlyAddress: string) => {
      const API_TE_URL = "https://facegame.tw1.ru";
      try {
        const response = await axios.post(`${API_TE_URL}/stonfi_info/`, {
          wallet_address: userFriendlyAddress,
        });

        if (Array.isArray(response.data)) {
          setLPStonFi(response.data);
        } else {
          console.error("LP data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch LP StonFi:", error);
      }
    };

    if (userFriendlyAddress) {
      fetchLPStonFi(userFriendlyAddress);
      console.log(LPStonFi);
    }
  }, [userFriendlyAddress]);

  // Fetch Assets
  useEffect(() => {
    const fetchAssets = async (userFriendlyAddress: string) => {
      const API_TE_URL = "https://facegame.tw1.ru";
      try {
        const response = await axios.post(`${API_TE_URL}/assets_by_wallet/`, {
          wallet_address: userFriendlyAddress,
        });

        if (Array.isArray(response.data.assets)) {
          setAssets(response.data.assets);
          calculateTotalBalance(response.data.assets); // Вызов функции для расчета общего баланса
        } else {
          console.error("Assets data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    if (userFriendlyAddress) {
      fetchAssets(userFriendlyAddress);
    }
  }, [userFriendlyAddress]);

  useEffect(() => {
    const getWallets = async () => {
      const wallets = await cloudStorage.get("wallets");
      console.log(wallets);
      if (!wallets) {
        navigate("/connect");
      }
      return wallets;
    };
    getWallets();
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
    assets.forEach((asset) => {
      total += (asset.amount / 10 ** 9) * asset.price_usd;
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

  useEffect(() => {
    setNFTS([
      {
        name: "NFT NAME",
        description: "Nft description",
        image_url: nftImg,
      },
      {
        name: "NFT NAME",
        description: "Nft description",
        image_url: nftImg,
      },
      {
        name: "NFT NAME",
        description: "Nft description",
        image_url: nftImg,
      },
    ]);
  }, []);

  return (
    <div className="h-screen overflow-visible w-full bg-gray-700">
      <div className="h-2/5 flex flex-col justify-between pt-5 ">
        <div className="flex flex-col items-start gap-4 px-8 ">
          <div className="flex flex-row cursor-pointer items-center gap-2" onClick={() => navigate("/profiles")}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black">
              <img src={logo} alt="logo" className="h-8 w-8 " />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-300 text-xl">WhalePanda</span>
              <span className="text-gray-400 text-md flex items-center centfont-semibold">
                {userFriendlyAddress ? (
                  <span className="flex items-center">
                    {shortenWallet(userFriendlyAddress)}
                    <IoIosArrowForward className="ml-1" />
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-400">Net Worth</span>
            <span className="font-semibold text-3xl text-white">${totalBalance}</span>
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
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <img src={elipse} alt="elipse" className="h-5 w-5" />
            <span className="font-bold text-xl">Assets ({assets.length})</span>
          </div>
          <div className="flex flex-row items-center gap-1 cursor-pointer">
            <FaClipboardList size={20} className="text-gray-500" />
            <span className="font-semibold text-lg text-gray-500">Transactions</span>
          </div>
        </div>
        <div className="mt-8 flex justify-between text-gray-400 font-semibold text-center">
          <span className="text-left" style={{ flex: 4 }}>
            ASSETS/AMOUNT
          </span>
          <span className="" style={{ flex: 3 }}>
            PRICE
          </span>
          <span className="text-right" style={{ flex: 3 }}>
            USD VALUE
          </span>
        </div>

        <div className="flex flex-col gap-5 mt-8 mb-10">
          {assets.slice(0, visibleAssets).map((asset) => (
            <div key={asset.name}>
              <div className="flex flex-row justify-between cursor-pointer">
                <div className="flex gap-2 items-center flex-1" style={{ flex: 4 }}>
                  <img src={asset.image_url} alt="logo" className="w-12 h-12" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-md text-gray-700">{(asset.amount / 10 ** 9).toFixed(3)}</span>
                    <span className="font-semibold text-gray-300">{asset.symbol}</span>
                  </div>
                </div>
                <span className="font-semibold text-gray-700 items-center flex text-center flex-1" style={{ flex: 3 }}>
                  <span className="mx-auto">{"$" + asset.price_usd.toFixed(2)}</span>
                </span>
                <span className="font-semibold text-gray-700 items-center flex text-center flex-1" style={{ flex: 3 }}>
                  <span className="mx-auto">{"$" + ((asset.amount / 10 ** 9) * asset.price_usd).toFixed(2)}</span>
                </span>
              </div>
            </div>
          ))}
          {visibleAssets < assets.length && (
            <button onClick={showMore} className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded">
              Show more
            </button>
          )}
        </div>

        {/* NFTs */}
        <div className="nft-part bg-white rounded-lg h-fit p-6 dropdown">
          <div className="dropdown-label">
            <div className="nft-h flex justify-between">
              <div className="flex">
                <RiNftLine className="size-6" />
                <span className="font-bold text-lg flex ml-2">NFTs</span>
              </div>
              {nfts.length !== 0 ? (
                <IoIosArrowForward
                  onClick={() => navigate("/nft-list")}
                  className={`ml-2 size-6 text-gray-400 cursor-pointer transform ${isOpen ? "rotate-90" : "rotate-0"}`}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="dropdown-content">
            <div className="nfts-list grid grid-cols-3 p-1 gap-1 items-center justify-center">
              {nfts.length === 0 ? (
                <span className="mt-14 text-xl font-semibold text-gray-400">You have no NFTs ;(</span>
              ) : (
                nfts.map((nft, index) => (
                  <div className="flex flex-col gap-1 items-center justify-center rounded-md mt-2" key={index}>
                    {nft.image_url && <img className="w-20 h-20 rounded-md" src={nft.image_url} alt={nft.name} />}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Tools */}
        <div className="tools-part mt-10">
          <div className="tools-header flex items-center mb-5">
            <IoAnalyticsOutline className="size-6" />
            <span className="font-bold text-lg ml-2">Tools</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <img
                src="https://static.ston.fi/favicon/android-chrome-512x512.png"
                alt="STON.fi Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="font-bold text-lg">STON.fi</span>
            </div>
            <button className="flex items-center text-gray-500">
              <span className="flex items-center gap-2 bg-gray-300 py-1 px-3 rounded-lg">
                LP Analytics <IoAnalyticsOutline className="size-7" />
              </span>
            </button>
          </div>
          <div className="tool-card bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-500 bg-gray-200 px-2 py-1 rounded-lg">Liquidity Pool</span>
              <span className="text-lg font-semibold">$16.51</span>
            </div>
            <div className="tool-body p-4 rounded-lg">
              <div className="flex justify-between font-semibold text-gray-700 mb-2">
                <span className="w-1/3">Supplied</span>
                <span className="w-1/3 text-center">Amount</span>
                <span className="w-1/3 text-right">USD Value</span>
              </div>
              <div className="tool-supplied mb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center w-1/3 bg-black p-2 rounded-full ">
                    <img src={tonSymbol} alt="Toncoin" className="w-6 h-6 mr-2" />
                    <span className="text-gray-400">Toncoin</span>
                  </div>
                  <div className="text-center w-1/3">
                    <span className="block text-gray-700">0.0025</span>
                  </div>
                  <div className="text-right w-1/3">
                    <span className="text-gray-500">$8.26</span>
                  </div>
                </div>
              </div>
              <div className="tool-supplied">
                <div className="flex justify-between items-center">
                  <div className="flex items-center w-1/3 bg-black p-2 rounded-full ">
                    <img src={logo} alt="Traction" className="w-6 h-6 mr-2" />
                    <span className="text-gray-400">Traction</span>
                  </div>
                  <div className="text-center w-1/3">
                    <span className="block text-gray-700">8.252</span>
                  </div>
                  <div className="text-right w-1/3">
                    <span className="text-gray-500">$8.25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
