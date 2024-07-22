// import { useEffect, type FC } from "react";
import { type FC } from "react";
// import { useTonAddress } from "@tonconnect/ui-react";
import Logo from "@/pages/IndexPage/TELogo.svg";
import { Link } from 'react-router-dom';
// import { TonConnectButton } from "@tonconnect/ui-react";

// import { useNavigate } from "react-router-dom";

export const ConnectPage: FC = () => {
	// const userFriendlyAddress = useTonAddress();
  // const navigate = useNavigate();

	return (
		    <div className='h-full p-4 bg-black justify-center items-center'>
      <div className="txt text-center h-full mb-9 bg-zinc-900 rounded-lg p-5 py-10 text-gray-300 flex flex-col items-center">
        <div className="logo-name mb-2 flex flex-col items-center">
          <span className='w-24 h-24 mt-4 p-4 rounded-full bg-black flex items-center justify-center mb-3'>
            <img className='text-yellow-300 h-10' src={Logo} alt="" />
          </span>
          <h2 className='font-bold text-2xl'>Traction Eye</h2>
        </div>
        
        <h3 className='text-xl'>Universal toolbar for investors</h3>

        <div className='text-s mt-10'>
          <span className='mx-auto text-5xl'>💸</span>
          <p className='flex mb-6 mt-2'>Analyse PnL and profitability of DeFi protocols on one screen</p>
          
          <span className='mx-auto text-5xl'>📊</span>
          <p className='flex mt-2'>Track the onchain activity of influencers you trust and earn with them</p>
        </div>
  
      </div>
      <Link to='/'>
      <button className="bg-yellow-500 p-5 sticky bottom-0 rounded-xl flex w-full justify-center">Connect with Wallet</button>
      </Link>
		</div>
	);
};
