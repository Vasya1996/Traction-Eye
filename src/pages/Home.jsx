import { useEffect, useState } from "react";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import logo from "../image/tractionEye.svg";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { shortenWallet, fetchWalletInfo } from '../components/utilities';
import elipse from "../image/Ellipse 7.png";
import tonSymbol from '../image/ton_symbol.svg'
import { FaClipboardList } from "react-icons/fa";
import { initCloudStorage } from "@tma.js/sdk-react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

// icons
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoIosArrowForward } from 'react-icons/io';
import { LiaToolsSolid } from "react-icons/lia";
import { RiNftLine } from "react-icons/ri";

export default function Home() {
  const [data, setData] = useState([]);
  const userFriendlyAddress = useTonAddress();
  const [assets, setAssets] = useState([]);
  const [nfts, setNFTS] = useState([]);
  const [userData, setUserData] = useState(null);

  const rawAddress = useTonAddress(false);
  const [walletInfo, setWalletInfo] = useState(null);
  
  const cloudStorage = initCloudStorage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [visibleAssets, setVisibleAssets] = useState(5);
  
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
          throw new Error('Failed to fetch assets');
        }
  
        if (Array.isArray(response.data.nfts)) {
          setNFTS(response.data.nfts);
        } else {
          console.error('NFTs data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch NFTS:', error);
      }
    };
  
    fetchNFT(userFriendlyAddress);
  }, [userFriendlyAddress]);
  
  useEffect(() => {
    const fetchAssets = async (userFriendlyAddress) => {
      const API_TE_URL = 'https://facegame.tw1.ru';
      try {
        const response = await axios.post(`${API_TE_URL}/assets_by_wallet/`, {
          wallet_address: userFriendlyAddress
        });
  
        if (!response.data) {
          throw new Error('Failed to fetch assets');
        }
  
        if (Array.isArray(response.data.assets)) {
          setAssets(response.data.assets);
        } else {
          console.error('Asset data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch assets:', error);
      }
    };
  
    fetchAssets(userFriendlyAddress);
  }, [userFriendlyAddress]);

  useEffect(() => {
    cloudStorage
      .get("wallets")
      .then((res) => {
        if (res) {
          const wallet = JSON.parse(res);

          if (res.length !== 0) {
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
  }, []);

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
              <span className="text-gray-400 text-md flex items-center centfont-semibold">{shortenWallet(userFriendlyAddress) ? <IoIosArrowForward className="ml-1"/> : "" }</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-400">Net Worth</span>
            <span className="font-semibold text-3xl text-white">
            {walletInfo ? `$ ${walletInfo.balance}` : '$ ...'}
            </span>
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
        
        <div className='flex flex-col gap-5 mt-8 mb-10'>
          {assets.slice(0, visibleAssets).map((asset) => (
            <div key={asset.name}>
              <div className='flex flex-row justify-between cursor-pointer'>
                <div className='flex gap-2 items-center flex-1' style={{ flex: 4 }}>
                  <img src={asset.image_url} alt='logo' className='w-12 h-12' />
                  <div className='flex flex-col'>
                    <span className='font-semibold text-md text-gray-700'>{asset.amount}</span>
                    <span className='font-semibold text-gray-300'>{asset.symbol}</span>
                  </div>
                </div>
                <span className='font-semibold text-gray-700 items-center flex text-center flex-1' style={{ flex: 3 }}>
                  <span className="mx-auto">{'$' + asset.price_usd.toFixed(2)}</span>
                </span>
                <span className='font-semibold text-gray-700 items-center flex text-center flex-1' style={{ flex: 3 }}>
                  <span className="mx-auto">{'$' + (asset.amount * asset.price_usd).toFixed(2)}</span>
                </span>
              </div>
            </div>
          ))}
          {visibleAssets < assets.length && (
            <button 
              onClick={showMore} 
              className='mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded'>
              Show more 
            </button>
          )}
        </div>

        {/* NFTs */}
        <div className="nft-part bg-white rounded-lg h-56 p-6 dropdown">
          <div className="dropdown-label">
            <div className="nft-h flex justify-between">
              <div className="flex">
                <RiNftLine className="size-6" />
                <span className="font-bold text-lg flex ml-2">NFTs</span>
              </div>
              <IoIosArrowForward onClick={() => navigate("/nft-list")} className={`ml-2 size-6 text-gray-400 cursor-pointer transform ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </div>
          </div>
          {isOpen && (
            <div className="dropdown-content">
              <div className="nfts-list flex justify-center">
                {nfts.length === 0 ? (
                  <span className="mt-20 text-xl font-semibold text-gray-400">You have no NFTs ;(</span>
                ) : (
                  nfts.map((nft, index) => (
                    <div key={index}>
                      <p>{nft.name}</p>
                      <p>{nft.description}</p>
                      {nft.image_url && <img src={nft.image_url} alt={nft.name} />}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tools */}
        <div className="tools-part mt-10">
  <div className="tools-header flex items-center mb-5">
    <LiaToolsSolid className="size-6" />
    <span className="font-bold text-lg ml-2">Tools</span>
  </div>
  <div className="flex justify-between items-center mb-3">
    <div className="flex items-center">
      <img src="https://static.ston.fi/favicon/android-chrome-512x512.png" alt="STON.fi Logo" className="w-8 h-8 mr-2" />
      <span className="font-bold text-lg">STON.fi</span>
    </div>
    <button className="flex items-center text-gray-500">
      <span className="flex items-center gap-2 bg-gray-300 py-1 px-3 rounded-lg">
        LP Analytics <IoAnalyticsOutline className="size-7" />
      </span>
    </button>
  </div>
  <div className="tool-card bg-white rounded-lg p-4 shadow-lg">
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
            <span className="text-gray-00">$8.25</span>
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
