import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import tonkeeplogo from "../image/ton_keep.png";
import Wallet from "../image/wallet.svg";
import { ConnectedWallet, useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { initCloudStorage } from "@tma.js/sdk";
import { useNavigate } from "react-router-dom";

function Connect() {
  const { open, close, state } = useTonConnectModal();
  const wallet = useTonWallet();
  const navigate = useNavigate();
  const [tonConnectUi] = useTonConnectUI();
  const cloudStorage = initCloudStorage();
  const [address] = useState();
  const [p_payload, set_p_payload] = useState();

  const BASEBACKENDURL = "https://facegame.tw1.ru/";

  const fetchUnsignedPayload = async () => {
    try {
      const response = await fetch(BASEBACKENDURL + "get_unsigned_payload");

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      const data = await response.json();
      set_p_payload(data.unsigned_proof_payload);
      return data.unsigned_proof_payload;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    console.log("set p", p_payload);
    tonConnectUi.setConnectRequestParameters({
      state: "ready",
      value: {
        tonProof: p_payload,
      },
    });
  }, [p_payload]);

  useEffect(() => {
    tonConnectUi.onStatusChange((wallet) => {
      if (wallet) {
        console.log(wallet);
        handleStatusChange(wallet);
      }
    });
  }, []);

  const handleStatusChange = async (wallet: ConnectedWallet) => {
    const dataToSend = {
      proof_payload: wallet.connectItems?.tonProof.proof.payload,
      wallet_info: wallet,
    };

    try {
      const response = await fetch(BASEBACKENDURL + "token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const JWT_token = data.token;
      console.log(data, JWT_token);

      try {
        const storedWallets = await cloudStorage.get("wallets");
        const wallets = JSON.parse(storedWallets || "[]"); // Initialize with empty array if null
        console.log(wallets);
        wallets.push({ JWT_token, username: data.username, address });
        await cloudStorage.set("wallets", JSON.stringify(wallets));
        console.log("new", await cloudStorage.get("wallets"));
      } catch (error) {
        const newWallet = [{ JWT_token, username: data.username, address }];
        await cloudStorage.set("wallets", JSON.stringify(newWallet));
      }

      navigate("/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUnsignedPayload();
    };
    fetchData();
    open();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-700">
      <div className="h-2/5 flex flex-col justify-between pt-10 ">
        <div className="flex justify-start px-10 ">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-400">Net Worth</span>
            <span className="font-semibold text-3xl text-white">$0</span>
            <span className="font-semibold text-md text-gray-400">+0%($0)</span>
          </div>
        </div>

        {/* <div className="h-2/5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data_chart} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Area type="monotone" dataKey="value" stroke="#43A047" fill="#43A047" opacity={0.4} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div> */}
      </div>
      <div className="flex flex-col h-3/5 bg-white rounded-t-3xl p-4">
        <span className="text-center text-black text-2xl font-semibold">Login</span>

        {/* <div className="mt-10 flex flex-col gap-5">
          <button
            onClick={() => handleWalletConnect()}
            className="border p-3 rounded-xl flex flex-row justify-between items-center w-full connect-btn"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-xl h-10 w-10 flex overflow-hidden">
                <img src={Wallet} alt="tonkeeplogo" className="h-10 w-10" />
              </div>
              <span className="font-bold text-xl">Wallet</span>
            </div>
            <IoIosArrowForward size={20} color="black" />
          </button> 
          <button className="border p-3 connect-btn rounded-xl flex flex-row justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <div className="rounded-xl h-10 w-10 flex overflow-hidden">
                <img src={tonkeeplogo} alt="tonkeeplogo" className="h-10 w-10" />
              </div>
              <span className="font-bold text-xl">Tonkeeper</span>
            </div>
            <IoIosArrowForward size={20} color="black" />
          </button>
        </div>*/}
      </div>
    </div>
  );
}

export default Connect;
