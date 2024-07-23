// components/PremiumBuyPage.tsx
import { FC } from "react";
import { postEvent } from '@telegram-apps/sdk';
import { IoSwapVertical } from "react-icons/io5";
import { GiFlame } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { BiStats } from "react-icons/bi";

import IconLogo from '@/pages/ProfilesListPage/AddWallet.svg';
import { BsFillCollectionFill } from "react-icons/bs";
import IconMoreFeatures from './Icon_more_features.png';



// screenshots
import FirstScreenShot from './1.png';

const PremiumBuyPage: FC = () => {
    // const handleRemoveClick = () => {
    //     postEvent('web_app_trigger_haptic_feedback', {type: 'notification', notification_type: 'warning'});
    //     alert('Remove Button Clicked!');
    // };

    const handleBuyClick = () => {
        postEvent('web_app_trigger_haptic_feedback', {type: 'notification', notification_type: 'warning'});
    };

    return (
        <div className="relative bg-white flex flex-col">
            <div className="relative h-52 bg-gradient-to-r from-black via-black via-yellow-000 via-black to-black rounded-b-3xl flex-col flex justify-center items-center sparkle-container">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="sparkle"></div>
                ))}
                <div className="shadow-2xl p-2 rounded-full shadow-gray-500 mb-5">
                    <div className="justify-center text-center">
                        <BiStats className="justify-center flex text-yellow-400 text-7xl" />
                    </div>
                </div>

                <p className="text-white text-xl">Traction Eye <span className="text-yellow-400">Premium</span></p>
                <p className="text-gray-400 font-light">PnL liquidity pool analytics Including:</p>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 items-center ">

                <div className="flex flex-col items-center p-4 pt-7 bg-gray-100 rounded-3xl shadow-md h-32">
                    <GiFlame className="text-4xl items-center flex text-gray-700 mb-2" />
                    <p className="text-center text-gray-700">Impermanent loss</p>
                </div>
                <div className="flex flex-col items-center p-4 pt-7 bg-gray-100 rounded-3xl shadow-md h-32">
                    <FaSeedling className="text-4xl text-gray-700 mb-2" />
                    <p className="text-center text-gray-700">Farm Rewards</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-100 rounded-3xl shadow-md h-32">
                    <IoSwapVertical className="text-4xl text-gray-700 mb-2" />
                    <p className="text-center text-gray-700">Profit from swap fees</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-100 rounded-3xl shadow-md h-32">
                    <IoSwapVertical className="text-4xl text-gray-700 mb-2" />
                    <p className="text-center text-gray-700">Analytics within a period of time</p>
                </div>
            </div>

            <div>
                <img src={FirstScreenShot} className="rounded-3xl" alt="" />
            </div>

            <div className="flex gap-8 text-center px-14 justify-center my-10">
                <div className="w-1/2 ">
                    <div className="flex justify-center mb-5">
                        <img className="size-10" src={IconLogo} alt="" />
                    </div>

                    <p>
                        Connect more than 2 addresses at once
                    </p>
                </div>

                <span className="w-1 bg-gray-200"></span>

                <div className="w-1/2">
                    <div className="flex justify-center mb-5">
                        <BsFillCollectionFill className="size-10"/>
                    </div>

                    <p>
                        Premium analytics for all connected wallets
                    </p>
                </div>
            </div>

            <div className="flex-col flex justify-center items-center">
                <img className="size-20 rounded-full mb-2" src={IconMoreFeatures} alt="" />
                <p> More features to come...</p>
            </div>

            <div className="sticky mx-4 bottom-0 pb-8 shadow-lg pt-5">
                <button
                    onClick={handleBuyClick} 
                    className="w-full cursor-pointer bg-gray-400 flex justify-center items-center text-gray-500 py-4 px-4 rounded-xl shadow-md transition duration-300"><IoDiamondOutline className="mr-2"/>Available Soon<IoDiamondOutline className="ml-2" /></button >
            </div>
        </div>
    );
};

export default PremiumBuyPage;
