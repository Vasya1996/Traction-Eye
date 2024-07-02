import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import nftImg from "../assets/nft.avif";

const nftData = {
  name: "NFT NAME",
  description: "Nft description",
  image_url: nftImg,
};

export default function NFTDetails() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header flex items-center justify-between py-4">
        <button className="flex items-center space-x-2 px-3 py-1 rounded-full">
          <IoIosArrowBack onClick={() => navigate("/")} className="icon-back text-xl cursor-pointer" />
          <span className="text-black font-semibold">Back</span>
        </button>
      </header>
      <main>
        <div>
          <img src={nftData.image_url} className="w-full" alt="" />
        </div>
        <div className="p-8">
          <h1 className="text-2xl font-bold bottom-1 border-b pb-4">{nftData.name}</h1>
          <ul className="mt-4 flex flex-col gap-y-2">
            <li className="flex justify-between"><span className="font-semibold opacity-50">Last Price</span><span>1</span></li>
            <li className="flex justify-between"><span className="font-semibold opacity-50">Last Price</span><span>1</span></li>
            <li className="flex justify-between"><span className="font-semibold opacity-50">Last Price</span><span>1</span></li>
          </ul>
        </div>
      </main>
    </div>
  );
}
