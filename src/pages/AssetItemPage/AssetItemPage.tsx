import React, { FC } from "react";
import { Link } from 'react-router-dom';
import AssetList from "@/components/AssetList";
import { Skeleton } from "@/components/ui/skeleton";
import TONLogo from '@/pages/IndexPage/ton_symbol.svg';
import TELogo from '@/pages/ConnectPage/Logo.svg';
import { API } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbCircleDotted } from "react-icons/tb";
import { PiImages } from "react-icons/pi";
import { IoAnalyticsOutline } from "react-icons/io5";


const AssetItemPage: FC = () => {
    const params = useParams();
    
    console.log(params);
    
    return (
        <div className="h-screen bg-gray-800">
            <div className="hero h-56 px-3">
                <div className="userdata flex">
                        <div className="flex items-center">
                            <img className="h-11 w-11 py-3 px-2 bg-black rounded-full mr-3" src={TELogo} alt="" />
                            <div className="mr-2 items=center">
                                <p className="text-gray-300 font-semibold">TONCOIN</p>
                                <p className="text-gray-400 font-light">N1</p>
                            </div>
                            <MdOutlineKeyboardArrowRight className="text-zinc-400 my-auto size-5"/>
                        </div>
                </div>
            </div>


        </div>
    );
};

export default AssetItemPage;
