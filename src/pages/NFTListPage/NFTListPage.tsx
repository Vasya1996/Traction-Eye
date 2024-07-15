import { FC } from 'react';
import { Link } from 'react-router-dom';
import { postEvent } from '@telegram-apps/sdk';

// NFTs import
import { nfts } from '../IndexPage/IndexPage';

// Icons
import TONLogo from './ton_symbol.svg';
import { NFT } from '@/types/types';
import { escape } from 'querystring';

const NFTListPage: FC = () => {

  const handleHapticClick = () => {
      postEvent('web_app_trigger_haptic_feedback', {type: 'impact', impact_style: 'medium'});
  };

  if (nfts.length !== 0) {
    return (
      <div className='h-full p-4 bg-gray-50 flex flex-col items-center'>
        <div className="flex justify-start mb-5 w-full">
          <span className='font-semibold flex items-center text-center text-lg' onClick={handleHapticClick}>The Open Network 
            <span className='flex ml-2 items-center text-gray-500 text-base'>({nfts.length})
              <img className='ml-2 h-7' src={TONLogo} alt="TON Logo" />
            </span>
          </span>
        </div>
  
          <ul className='grid grid-cols-2 gap-5 '>
                  {nfts.map((nft: NFT) => (
                  <li key={nft.id}>
                      <Link to={`/nft/${nft.id}`} onClick={handleHapticClick}>
                              <img className='h-30 w-30 rounded-xl' src={nft.image_url} alt={nft.name} />
                      </Link>
                  </li>
                  ))}
          </ul>
  
      </div>
  );
  } else {
    return (
    <div className='h-screen p-4 bg-gray-50 flex justify-center items-center'>
      <p className='text-center text-2xl'>No NFTs in Your Wallet</p>
    </div>
    )
  }


};

export default NFTListPage;
