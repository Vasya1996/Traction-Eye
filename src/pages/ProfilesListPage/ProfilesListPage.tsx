import { FC, useState, useEffect } from 'react';
import { ProfileItem } from '@/components/ProfileItem';
import AddWallet from "@/pages/ProfilesListPage/AddWallet.svg";
import { RxExit } from "@/components/icons";
import { useNavigate } from 'react-router-dom';
import { postEvent } from '@telegram-apps/sdk';
import { useTonAddress } from "@tonconnect/ui-react";
import { useTonConnectUI } from '@tonconnect/ui-react';
import { LocalStorageKeys } from '@/constants/localStorage';
import { useQuery } from '@tanstack/react-query';
import { ChartData } from '@/types';
import { PNL_API } from '@/api/pnl';
import { CACHE_OPTIONS } from '@/constants';


const profiles = [
  { username: "WhalePanda", wallet: "EQBVZB9x5FbLZaFYlDddnP_qZQwgjYuRMv5Ly_fMHtks43PV", balance: 1533 },
  // { username: "CryptoBag", wallet: "EQBmW-ZO76IcA-uVo4Zug1tU_TJ6qLZjAZ1PgULY9QYvZ8LX", balance:495 }
];

const ProfilesListPage: FC = () => {
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();  // Use useNavigate inside the component
  const { data: mainChartData } = useQuery<ChartData[]>({
    queryKey: ["mainChartData"],
    queryFn: () => PNL_API.getPnlByAddress({wallet_address: walletAddress, interval: 100, period: 100 }),
    enabled: !!walletAddress,
    refetchOnWindowFocus: false,
    ...CACHE_OPTIONS
});

  const [isManaged, setIsManaged] = useState(false);

  const totalBalance: number = mainChartData?.[0]?.net_worth ?? 0;


  useEffect(() => {
    if (walletAddress) return;
    setTimeout(() => {
      navigate("connect");
    }, 100)
  }, [walletAddress]);


  const handleClick = async (param: string) => {
    if (param === 'manageSwitch') {
      setIsManaged(prevIsManaged => !prevIsManaged);
      postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'soft' });

      console.log('isManaged:', !isManaged);
    } else if (param === 'disconnect') {
      postEvent('web_app_trigger_haptic_feedback', { type: 'notification', notification_type: 'warning' });
      
      const isConfirmed = window.confirm('Disconnect this Wallet?')
      
      if (isConfirmed) {
        if (tonConnectUI) {
          try {
            localStorage.removeItem(LocalStorageKeys.user_service_wallet_address);
            postEvent('web_app_trigger_haptic_feedback', { type: 'notification', notification_type: 'success' });
            alert('Successfuly removed!');
            await tonConnectUI.disconnect();
            navigate('/connect');  // Ensure the path is correct
          } catch (error) {
            console.error('Failed to disconnect:', error);
          }
        } else {
          console.error('TonConnectUI is not available.');
        }
      }
    } else if (param === 'premium') {
      postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'light' });
      navigate('premium');      
    } else {
      alert('Button clicked!');
    }
  };

  return (
    <div className='h-screen p-4 bg-gray-50 flex flex-col items-center'>
      <div className="flex justify-end mb-5 w-full">
        <span className='cursor-pointer' onClick={() => handleClick('manageSwitch')}>
          {isManaged ? <p className='text-gray-400'>Manage</p> : 'Manage'}
        </span>
      </div>

      {!isManaged ?
        <div className='mb-5 w-full'>
          <h2 className='font-semibold text-center text-xl mb-4'>Tap Account to Log In</h2>
          <ul className="profiles-list w-full">
            {profiles.map((profile) => (
              <ProfileItem
                managed={isManaged}
                balance={totalBalance}
                key={profile.wallet}
                username={profile.username}
                wallet={walletAddress}
              />
            ))}
          </ul>
          <div className="buttons flex mx-auto mt-10 flex-col gap-4 w-4/5">
            <button onClick={() => handleClick('premium')} className='flex bg-yellow-400 p-3 items-center justify-center rounded-xl w-100'>
              <img className='h-5 mr-2' src={AddWallet} alt="Add Wallet Icon" />
              Add Account
            </button>
            <button
              onClick={() => handleClick('disconnect')}
              className='flex bg-gray-300 p-3 items-center justify-center rounded-xl w-100'
            >
              <RxExit className='h-5 mr-2' />
              Disconnect
            </button>
          </div>
        </div>
        :
        <div className='mb-5 w-full'>
          <h2 className='font-semibold text-center text-xl mb-4'>Manage Profiles</h2>
          <ul className="profiles-list w-full">
            {profiles.map((profile) => (
              <ProfileItem
                managed={isManaged}
                key={profile.wallet}
                username={profile.username}
                wallet={walletAddress}
                balance={profile.balance}
              />
            ))}
          </ul>
        </div>
      }

      {/* Total Balance */}
      <div className='flex flex-col mx-auto justify-center'>
      <h3 className='text-center font-semibold'>
        ${ totalBalance % 1 === 0 ?  totalBalance.toFixed(0) : totalBalance.toFixed(2) }
      </h3>


        <span className='text-sm'>Total Balance of all profiles</span>
      </div>
    </div>
  );
};

export default ProfilesListPage;
