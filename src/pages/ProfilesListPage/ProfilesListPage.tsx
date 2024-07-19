import { FC, useState } from 'react';
import { ProfileItem } from '@/components/ProfileItem';
import AddWallet from "@/pages/ProfilesListPage/AddWallet.svg";
import { RxExit } from "react-icons/rx";
// import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
// import { spawn } from 'child_process';
// import { profile } from 'console';
import { postEvent } from '@telegram-apps/sdk';


const profiles = [
  { username: "WhalePanda", wallet: "EQBVZB9x5FbLZaFYlDddnP_qZQwgjYuRMv5Ly_fMHtks43PV", balance:1533 },
  // { username: "CryptoBag", wallet: "EQBmW-ZO76IcA-uVo4Zug1tU_TJ6qLZjAZ1PgULY9QYvZ8LX", balance:495 }
];

const totalBalance = profiles.reduce((acc, profile) => acc + profile.balance, 0);

const ProfilesListPage: FC = () => {
  const [isManaged, setIsManaged] = useState(false);

  const handleClick = (param: string) => {
    if(param === 'manageSwitch') {
      setIsManaged(prevIsManaged => !prevIsManaged);
      postEvent('web_app_trigger_haptic_feedback', {type: 'impact', impact_style: 'soft'});

      console.log('isManaged:', !isManaged); 
    } else {
      alert('Button clicked!')
    }
  };

  return (
    <div className='h-screen p-4 bg-gray-50 flex flex-col items-center'>
      <div className="flex justify-end mb-5 w-full">
        {/* onClick передает функцию handleClick, которая вызывает setIsManaged */}
        <span className='cursor-pointer' onClick={() => handleClick('manageSwitch')}>{isManaged ? <p className='text-gray-400'>Manage</p> : 'Manage'}</span>
      </div>

      {!isManaged ?
        <div className='j mb-5 w-full'>
          <h2 className='font-semibold text-center text-xl mb-4'>Tap Account to Log In</h2>
          <ul className="profiles-list w-full">
            {profiles.map((profile) => (
              <ProfileItem managed={isManaged} balance={profile.balance} key={profile.wallet} username={profile.username} wallet={profile.wallet} />
            ))}
          </ul>
          <div className="buttons flex mx-auto mt-10 flex-col gap-4 w-4/5">
            <Link to={'/connect'} className='flex bg-yellow-400 p-3 items-center justify-center rounded-xl w-100'><img className='h-5 mr-2' src={AddWallet} alt="Add Wallet Icon" /> Add Account</Link>
            <Link to={'/connect'} className='flex bg-gray-300 p-3 items-center justify-center rounded-xl w-100'><RxExit className='h-5 mr-2'/> Disconnect</Link>
          </div>
        </div>
        :
        <div className='j mb-5 w-full'>
        <h2 className='font-semibold text-center text-xl mb-4'>Manage Profiles</h2>
        <ul className="profiles-list w-full">
          {profiles.map((profile) => (
            <ProfileItem managed={isManaged} key={profile.wallet} username={profile.username} wallet={profile.wallet} balance={profile.balance}/>
          ))}
        </ul>


      </div>
      }

      {/* Total Balance */}
      <div className='flex flex-col mx-auto justify-center'>
        <h3 className='text-center font-semibold'>$ {totalBalance}</h3>
        <span className='text-sm'>Total Balance of all profiles</span>
      </div>

    </div>
  );
};

export default ProfilesListPage;
