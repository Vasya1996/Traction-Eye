import React, { useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import tonkeeplogo from '../image/ton_keep.png';
import Wallet from '../image/wallet.svg';
import { useTonConnectModal } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useRouter } from '../components/Router';


function Connect() {
  const { open } = useTonConnectModal();
  const {navigate} = useRouter()
  const [tonConnectUI] = useTonConnectUI();

  const BASEBACKENDURL = 'https://facegame.tw1.ru/'
  let proof_payload = 'undefined'

  useEffect(() => {
    fetch(BASEBACKENDURL + 'get_unsigned_payload')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      proof_payload = data.unsigned_proof_payload
      console.log('first request ' + proof_payload)
      tonConnectUI.setConnectRequestParameters({
        state: 'ready',
        value: {
          tonProof: proof_payload // here you insert payload
        }
      })
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  }, [tonConnectUI]);

  useEffect(() =>
    tonConnectUI.onStatusChange(wallet => {
      let JWT_token = 'Undefined';
      console.log(wallet)

      const dataToSend = {
        proof_payload: proof_payload,
        wallet_info: wallet
      };

      fetch(BASEBACKENDURL + 'token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // here is token
        console.log(data)
        JWT_token = data.token
        let username = data.username
        window.localStorage.setItem('user', JSON.stringify({token:JWT_token, name:username}))
        navigate('/');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }), []);

  const data_chart = [
    { day: 'start', value: 10 },
    { day: 'end', value: 10 }
  ];

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const initializeConnection = async () => {
      try {
        open({ signal });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to open connection:', error);
        }
      }
    };

    initializeConnection();

    return () => {
      controller.abort();
    };
  }, []);

  const handleWalletConnect = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      open({signal});
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      console.log('Wallet disconnected successfully');
      navigate('/connect');  // Перенаправление на /connect
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <div className='h-screen w-screen bg-gray-700'>
      <div className='h-2/5 flex flex-col justify-between pt-10 '>
        <div className='flex justify-start px-10 '>
          <div className='flex flex-col'>
            <span className='font-semibold text-sm text-gray-400'>Net Worth</span>
            <span className='font-semibold text-3xl text-white'>$0</span>
            <span className='font-semibold text-md text-gray-400'>+0%($0)</span>
          </div>
        </div>

        <div className='h-2/5 w-full'>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data_chart}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Area type="monotone" dataKey="value" stroke="#43A047" fill="#43A047" opacity={0.4} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='flex flex-col h-3/5 bg-white rounded-t-3xl p-4'>
        <span className='text-center text-black text-2xl font-semibold'>
          Login
        </span>
        <div className='mt-10 flex flex-col gap-5'>
          <button onClick={handleDisconnect}>disconnect</button>
          <button onClick={handleWalletConnect} className='border p-3 rounded-xl flex flex-row justify-between items-center w-full connect-btn'>
            <div className='flex items-center gap-2'>
              <div className='rounded-xl h-10 w-10 flex overflow-hidden'>
                <img src={Wallet} alt='tonkeeplogo' className='h-10 w-10' />
              </div>
              <span className='font-bold text-xl'>Wallet</span>
            </div>
            <IoIosArrowForward size={20} color='black' />
          </button>
          <button className='border p-3 connect-btn rounded-xl flex flex-row justify-between items-center w-full'>
            <div className='flex items-center gap-2'>
              <div className='rounded-xl h-10 w-10 flex overflow-hidden'>
                <img src={tonkeeplogo} alt='tonkeeplogo' className='h-10 w-10' />
              </div>
              <span className='font-bold text-xl'>Tonkeeper</span>
            </div>
            <IoIosArrowForward size={20} color='black' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Connect;
