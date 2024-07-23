// components/PremiumBuyPage.tsx
import { FC, useState, useEffect } from "react";
import { postEvent } from '@telegram-apps/sdk';
import { IoSwapVertical } from "react-icons/io5";
import { GiFlame } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { BiStats } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

import IconLogo from '@/pages/ProfilesListPage/AddWallet.svg';
import { BsFillCollectionFill } from "react-icons/bs";
import IconMoreFeatures from './Icon_more_features.png';
import FirstScreenShot from './1.png';

interface Item {
    id: number;
    title: string;
    subtitle: string;
    icon: JSX.Element;
}

const items: Item[] = [
    { id: 1, title: "Impermanent loss", subtitle: "Some subtitle text", icon: <GiFlame className="text-4xl text-gray-700 mb-2" /> },
    { id: 2, title: "Farm Rewards", subtitle: "Some subtitle text", icon: <FaSeedling className="text-4xl text-gray-700 mb-2" /> },
    { id: 3, title: "Profit from swap fees", subtitle: "Some subtitle text", icon: <IoSwapVertical className="text-4xl text-gray-700 mb-2" /> },
    { id: 4, title: "Analytics within a period of time", subtitle: "Some subtitle text", icon: <IoSwapVertical className="text-4xl text-gray-700 mb-2" /> }
];

const PremiumBuyPage: FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleBuyClick = () => {
        postEvent('web_app_trigger_haptic_feedback', { type: 'notification', notification_type: 'warning' });
    };

    useEffect(() => {
        if (selectedId !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedId]);

    return (
        <div className="relative bg-white flex flex-col">
            <div className={`relative ${selectedId ? "blur-sm" : ""}`}>
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

                <div className="grid grid-cols-2 gap-6 p-6 items-center">
                    {items.map(item => (
                        <motion.div 
                            key={item.id}
                            layoutId={item.id.toString()} 
                            className="flex flex-col items-center p-4 pt-7 bg-gray-100 rounded-3xl shadow-md h-32"
                            onClick={() => setSelectedId(item.id)}
                        >
                            {item.icon}
                            <p className="text-center text-gray-700">{item.title}</p>
                        </motion.div>
                    ))}
                </div>

                <div>
                    <img src={FirstScreenShot} className="rounded-3xl" alt="Screenshot" />
                </div>

                <div className="flex gap-8 text-center px-14 justify-center my-10">
                    <div className="w-1/2 ">
                        <div className="flex justify-center mb-5">
                            <img className="size-10" src={IconLogo} alt="Icon Logo" />
                        </div>
                        <p>Connect more than 2 addresses at once</p>
                    </div>
                    <span className="w-1 bg-gray-200"></span>
                    <div className="w-1/2">
                        <div className="flex justify-center mb-5">
                            <BsFillCollectionFill className="size-10" />
                        </div>
                        <p>Premium analytics for all connected wallets</p>
                    </div>
                </div>

                <div className="flex-col flex justify-center items-center">
                    <img className="size-20 rounded-full mb-2" src={IconMoreFeatures} alt="More Features" />
                    <p>More features to come...</p>
                </div>
            </div>

            <div className="sticky mx-4 bottom-0 pb-8 shadow-lg pt-5">
                <button
                    onClick={handleBuyClick}
                    className="w-full cursor-pointer bg-gray-400 flex justify-center items-center text-gray-500 py-4 px-4 rounded-xl shadow-md transition duration-300"
                >
                    <IoDiamondOutline className="mr-2" />Available Soon<IoDiamondOutline className="ml-2" />
                </button>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div 
                            className="fixed inset-0 bg-black bg-opacity-50 z-10 " 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 5 }} 
                            exit={{ opacity: 0 }} 
                        />
                        <motion.div 
                            layoutId={selectedId.toString()} 
                            className="fixed inset-0 flex items-center justify-center z-20 p-4"
                        >
                            <motion.div 
                                className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <motion.h5>{items.find(item => item.id === selectedId)?.subtitle}</motion.h5>
                                <motion.h2>{items.find(item => item.id === selectedId)?.title}</motion.h2>
                                <motion.button 
                                    onClick={() => setSelectedId(null)} 
                                    className="mt-4 bg-gray-300 px-4 py-2 text-center flex justify-center mx-auto rounded"
                                >
                                    Close
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PremiumBuyPage;
