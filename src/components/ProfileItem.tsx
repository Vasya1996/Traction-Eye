import type { FC } from 'react';
import ProfileAvatar from '@/pages/IndexPage/TELogo.svg'; 
import { postEvent } from '@telegram-apps/sdk';
import { useTonConnectUI } from '@tonconnect/ui-react';

// icons
import { MdDeleteOutline } from "react-icons/md";

// interfaces
import { ProfileItemProps } from '../types/types';

// Function to shorten wallet addresses
const shortenWallet = (wallet: string, startLength: number = 6, endLength: number = 4): string => {
  const start = wallet.substring(0, startLength);
  const end = wallet.substring(wallet.length - endLength);
  return `${start}...${end}`;
};

// ProfileItem component
export const ProfileItem: FC<ProfileItemProps> = ({ wallet, balance, managed }) => {
  const [tonConnectUI] = useTonConnectUI();

  const handleRemoveClick = () => {
    // Display confirmation dialog
    postEvent('web_app_trigger_haptic_feedback', { type: 'notification', notification_type: 'warning' });

    const isConfirmed = window.confirm("Remove this profile?");
    
    // If confirmed, perform the removal action
    if (isConfirmed) {
      tonConnectUI.disconnect();
      postEvent('web_app_trigger_haptic_feedback', { type: 'notification', notification_type: 'success' });
      alert('Profile removed successfully!');
    }
  };

  const selectedStyles = 'bg-blue-100 border-b-4 border-yellow-500'; // Styles for selected state
  const baseStyles = 'bg-white shadow rounded-3xl flex justify-between items-center relative';

  return (
    <li className={`${baseStyles} ${selectedStyles} shadow h-20 p-4 mb-2`}>
      <div className='flex items-center'>
        <span className='bg-black items-center h-12 flex px-2 rounded-full mr-3'>
          <img className='h-4' src={ProfileAvatar} alt="pfp" />
        </span>
        <div>
          <span className='block text-gray-600'>{shortenWallet(wallet)}</span>
        </div>
      </div>
      {managed ? (
        <button onClick={handleRemoveClick} className='flex items-center'>
          <MdDeleteOutline className='size-10 bg-red-300 rounded-lg p-2' />
        </button>
      ) : (
        <span className='font-light'>${balance}</span>
      )}
      <span className='absolute bottom-0 left-1/2 transform font-light flex w-full rounded-b-full justify-center mt-12 -translate-x-1/2 text-yellow-500 text-sm font-semibold'></span>
    </li>
  );
};
