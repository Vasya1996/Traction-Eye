import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import nftImg from "../assets/nft.avif";


const nftData = [
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
];



export default function NftPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <header className="header flex items-center justify-between py-4">
        <IoIosArrowBack onClick={() => navigate("/")} className="icon-back text-xl cursor-pointer" />
        <button className="follow-button flex items-center space-x-2 bg-yellow-500 text-white px-3 py-1 rounded-full">
          <FaPlusCircle className="text-black icon-follow" />
          <span className='text-black font-semibold'>Follow</span>
        </button>
      </header>
      <div className="title my-4">
        <h1 className="text-2xl font-bold">The Open Network <span className="text-gray-600 text-lg">(8)</span></h1>

      </div>
      <div className="nft-grid grid grid-cols-2 gap-4">
        {nftData.map((nft, index) => (
          <div onClick={() => navigate("/nft")} key={index} className="cursor-pointer h-fit p-[0.8px] rounded-lg border bg-gray-100">
            <img src={nft.image_url} alt={nft.name} className="rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

