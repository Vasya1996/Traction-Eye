import { FC } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import TONLogo from '@/pages/IndexPage/ton_symbol.svg'; // Ensure the correct path
import TELogo from '@/pages/IndexPage/ton_symbol.svg';  // Ensure the correct path
import STONLogo from '@/pages/IndexPage/stonfilogo.jpg'; // Ensure the correct path

const LiquidityPool: FC = () => {
  return (
    <div>
        <div className="flex justify-between items-center my-4">
            <div className="flex items-center">
            <img src={STONLogo} alt="STON.fi" className="rounded-lg h-8 w-8 mr-2" />
            <p className="font-semibold text-xl">STON.fi</p>
            </div>
            <button className="text-blue-800 px-3 py-1 bg-gray-200 rounded-lg flex items-center">
            LP analytics <MdOutlineKeyboardArrowRight />
            </button>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">

            
            <div className="">
                <div className="flex justify-between items-center">
                <p className="text-blue-500 bg-blue-100 rounded-full px-4 py-1 h-8">Liquidity Pool</p>
                <p className="text-2xl font-bold mt-2">$16.51</p>
                </div>
                
                <div className="mt-4">
                <div className="grid grid-cols-3 text-gray-500 text-xs">
                    <p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">SUPPLIED</p>
                    <p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-start">AMOUNT</p>
                    <p className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider justify-self-end">USD VALUE</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center col-span-1">
                    <img src={TONLogo} alt="Toncoin" className="h-6 w-6 mr-2" />
                    <span className="text-black">Toncoin</span>
                    </div>
                    <p className="col-span-1 flex justify-start text-black">0.0025</p>
                    <p className="col-span-1 text-black">$8.26</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-cente  col-span-1">
                    <img src={TELogo} alt="Scaleton" className="h-6 w-6 mr-2" />
                    <span className="text-black">Scaleton</span>
                    </div>
                    <p className="col-span-1 text-black">8.252</p>
                    <p className="col-span-1 text-black">$8.25</p>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LiquidityPool;
