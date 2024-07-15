import type { FC } from 'react';
import ProfileAvatar from '@/pages/ConnectPage/Logo.svg' 
import { postEvent } from '@telegram-apps/sdk';


// icons
import { MdDeleteOutline } from "react-icons/md";

// interfaces
import { ProfileItemProps } from '../types/types';


const shortenWallet = (wallet: string, startLength: number = 6, endLength: number = 4): string => {
  const start = wallet.substring(0, startLength);
  const end = wallet.substring(wallet.length - endLength);
  return `${start}...${end}`;
};

export const ProfileItem: FC<ProfileItemProps> = ({ username, wallet, balance, managed }) => {
  const handleRemoveClick = () => {
    postEvent('web_app_trigger_haptic_feedback', {type: 'notification', notification_type: 'warning'});
    alert('Remove Button Clicked!');
  };

  if(!managed) {
    return (
        <li className='bg-white p-4 mb-2 shadow rounded-3xl flex justify-between items-center'>
            <div className='flex'>
            <span className='bg-black items-center flex px-2 rounded-full mr-3'><img className='h-5' src={ProfileAvatar} alt="pfp" /></span>
        
                <div>
                    <span className='block font-semibold'>{username}</span>
                    <span className='block text-gray-600'>{shortenWallet(wallet)}</span>
                </div>   
            </div>

            <span className='font-light'>${balance}</span>
        </li>
      );
  } else {
    return (
        <li className='bg-white p-4 mb-2 shadow rounded-3xl flex justify-between'>
            <div className='flex'>
                <span className='bg-black items-center flex px-2 rounded-full mr-3'><img className='h-5' src={ProfileAvatar} alt="pfp" /></span>
        
                <div>
                    <span className='block font-semibold'>{username}</span>
                    <span className='block text-gray-600'>{shortenWallet(wallet)}</span>
                </div> 
            </div>

            <button onClick={handleRemoveClick}>
                <MdDeleteOutline className='size-10 flex justify-self-end bg-red-300 rounded-lg p-2'/>
                </button>
        </li>
      );
  }

};
