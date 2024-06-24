import { IoIosArrowBack } from "react-icons/io";
import logo from "./image/tractionEye.svg";
import { RiUserAddLine } from "react-icons/ri";

function Authentication() {
  return (
    <div className="text-center bg-gray-100 flex flex-col h-screen items-center w-screen py-3 px-5 ">
      <div className="w-full  flex flex-col h-screen items-center ">
        <div className="flex flex-row justify-between  items-center w-full">
          <span>
            <IoIosArrowBack color="black" size={20} />
          </span>
          <span>
            {" "}
            <a className=" text-red-500 no-underline font-semibold ">Manage</a>
          </span>
        </div>

        <span className="text-black font-semibold  mt-6" style={{ fontSize: "24px" }}>
          Tap Account To Login
        </span>

        <button className="flex flex-row bg-white p-3 mt-10 rounded-lg justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center  bg-black">
              <img src={logo} alt="logo" className="h-6 w-6 " />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold ">WhalePanda</span>
              <span className="text-gray-500 text-sm">0xaaa....bbb</span>
            </div>
          </div>
          <span className="font-semibold text-lg text-black">$145</span>
        </button>

        <button className="flex flex-row bg-white p-3 mt-2 rounded-lg justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center  bg-black">
              <img src={logo} alt="logo" className="h-6 w-6 " />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">0xe442....2133</span>
              <span className="text-gray-500 text-sm">0xe442....2133</span>
            </div>
          </div>
          <span className="font-semibold text-lg text-black">$5</span>
        </button>

        <button className="text-red-500 text-lg flex flex-row w-5/6 justify-center items-center gap-2 bg-white py-4 mt-10 rounded-lg">
          <RiUserAddLine size={20} color="red" />
          <span>Add account</span>
        </button>

        <button className="text-red-500 text-lg flex flex-row w-5/6 justify-center items-center gap-2 bg-white py-4 mt-2 rounded-lg">
          <span className="text-gray-400">Logout</span>
        </button>
      </div>

      <span className="text-gray-500 text-lg">
        The total networth of the wallets is <span className="text-black font-bold text-lg">$150</span>
      </span>
    </div>
  );
}
export default Authentication;