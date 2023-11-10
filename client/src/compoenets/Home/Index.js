import React from "react";
import "./Home.css";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineLightMode } from "react-icons/md";

const Index = () => {
  return (
    <div className="home">
      <Header />
      {/* --- body  */}
      <div className="home_api_box   mx-auto h-[full] flex-col px-[86px] py-[150px] w-[577px] flex justify-center mt-[-81px]">
        <img src="./data/logo.png" alt="" />
        <div className="my-[47px]">
          <div className="flex justify-start place-items-center border-b-2 text-[white] ">
            <input
              type="number"
              placeholder="Enter Value"
              className="w-[80%] bg-transparent p-2 outline-none "
            />
            <div className="flex justify-start place-items-center gap-[10px]">
              <h2>BNB</h2>
              <img
                src="./data/b.png"
                alt=""
                className="!w-[20px] !h-[20px] object-contain"
              />
            </div>
          </div>
          <div className="flex justify-start place-items-center border-b-2 text-[white] mt-[20px]">
            <input
              type="number"
              placeholder="Enter Value"
              className="w-[80%] bg-transparent p-2 outline-none "
            />
            <div className="flex justify-start place-items-center gap-[10px]">
              <h2>BNB</h2>
              <img
                src="./data/b.png"
                alt=""
                className="!w-[20px] !h-[20px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="home_header !z-10 flex justify-end  place-items-center gap-[30px] py-[30px] px-[40px] text-white ">
      <div className="flex justify-start place-items-center gap-[11px]">
        <img src="./data/Vector1.png" alt="" className="w-[32] h-[17]" />
        <h2 className="text-[16px] font-[600]">Connected</h2>
        <p className="text-[16px] font-[300]">0xb9B2****</p>
        <AiFillEye className="text-[18px] cursor-pointer text-[#AAA]" />
      </div>
      <div className="flex justify-start place-items-center gap-[11px]">
        <MdOutlineLightMode className="text-[#F0C724] cursor-pointer text-[18px]" />
        <p className="text-[16px] font-[600]">Light Mode</p>
      </div>
    </div>
  );
};

export default Index;
