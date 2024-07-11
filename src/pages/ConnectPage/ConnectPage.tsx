import type { FC } from 'react';

import Logo from './Logo.svg';

export const ConnectPage: FC = () => {
  
	const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className='h-screen p-4 bg-black  justify-center items-center'>
      <div className="txt text-center h-5/6 bg-zinc-900 rounded-lg p-5 text-gray-300 flex flex-col items-center">
        <div className="logo-name mb-2 flex flex-col items-center">
          <span className='w-24 h-24 rounded-full bg-black flex items-center justify-center mb-3'>
            <img className=' text-yellow-300 h-10' src={Logo} alt="" />
          </span>
          <h2 className='font-bold text-lg'>Traction Eye</h2>
        </div>
        
        <h3 className='text-l'>Universal toolbar for investors</h3>

        <div className='text-xs mt-4'>
        <span className='mx-auto text-2xl'>💸</span>
        <p className='flex mb-4'>Analyse PnL and profitability of DeFi protocols on one screen</p>
        <span className='mx-auto text-2xl'>📊</span>
        <p className='flex'>Track the onchain activity of influencers you trust and earn with them</p>
        </div>
  
      </div>
        <button onClick={handleClick} className='flex w-full justify-center bg-yellow-400 p-3 rounded-xl text-black mt-5'>
          Connect with Wallet
        </button>
    </div>
  );
    ;
};
