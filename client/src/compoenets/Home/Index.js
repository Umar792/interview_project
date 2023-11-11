import React, { useEffect, useState } from "react";
import "./Home.css";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineLightMode } from "react-icons/md";
import { MdCompareArrows } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai"

const Index = () => {
  const [coinData, setCoinData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState(1)
  const [search, setSearch] = useState("")
  const [name, setName] = useState("BNB")
  const [selectedCoinDetails, setSelectedCoinDetails] = useState(null);
  const [bnbPrice, setBnbPrice] = useState(null);
  const [loading, setloading] = useState(false)


  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        setloading(true)
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=false');
        setloading(false)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Set the fetched data to the state
        setCoinData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Show the dropdown when the user enters a value
    setShowDropdown(value.length > 0);
  };

  const handleSelectSymbol = (name, id) => {
    // Set the selected symbol and hide the dropdown
    setName(name)
    setSelectedSymbol(id);
    setShowDropdown(false);
  };
  useEffect(() => {
    const filterthecoin = coinData?.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    setCoinData(filterthecoin)
  }, [search])

  useEffect(() => {
    if (input1 === "") {
      setShowDropdown(false)
    } else {
      setShowDropdown(true)
    }
  }, [input1])
  // ========= single coin  
  const fetchCoinDetails = async (coinId) => {
    try {
      setloading(true)
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedSymbol}?tickers=true&market_data=false&community_data=true&developer_data=true&sparkline=true`);
      setloading(false)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      // Set the fetched coin details to the state
      setSelectedCoinDetails(data);
    } catch (error) {
      console.error('Error fetching coin details:', error.message);
    }
  };


  // Function to handle X Swap button click
  const handleXSwapClick = async () => {
    await fetchCoinDetails(selectedSymbol);


  };
  useEffect(() => {
    // Check for the existence of necessary data
    if (selectedCoinDetails && selectedCoinDetails.tickers && selectedCoinDetails.tickers.length > 0) {
      const ticker = selectedCoinDetails.tickers[0];
      if (ticker && ticker.converted_last && ticker.converted_last.usd) {
        const coinPriceInUSD = ticker.converted_last.usd;
        const input1Value = parseFloat(input1);

        if (!isNaN(input1Value) && input1Value !== 0) {
          const calculatedBnbPrice = (input1Value / coinPriceInUSD).toFixed(4);
          setBnbPrice(calculatedBnbPrice);
        } else {
          console.error('Invalid or zero input value.');
        }
      } else {
        console.error('Missing necessary properties in the ticker data.');
      }
    } else {
      console.error('Missing necessary data for calculation.');
    }
  }, [selectedCoinDetails])



  return (
    <div className="home">
      <Header />
      {/* --- body  */}
      <div className="home_api_box   mx-auto  flex-col px-[86px] py-[50px] w-[577px] flex h-auto !justify-center ">
        <img src="./data/logo.png" alt="" />
        <div className="my-[47px]">
          <div className="flex  relative justify-start place-items-center border-b-2 text-[white] ">
            <input
              type="number"
              value={input1}
              onChange={(e) => { setInput1(e.target.value) }}
              placeholder="Enter Value"
              className="w-[80%] bg-transparent p-2 outline-none "
            />
            <div className="flex justify-start place-items-center gap-[10px]">
              <h2 className=" w-[80px] text-right">{name}</h2>
              <img
                src="./data/b.png"
                alt=""
                className="!w-[20px] !h-[20px] object-contain"
              />

            </div>
            {showDropdown && (
              // <div className="dropdown p-[10px] max-h-[360px] overflow-x-hidden overflow-y-auto absolute left-0 top-[41px] w-full bg-black z-20 border-2">
              //   <div className="flex justify-start place-items-center my-2 gap-[14px]  border-b-[1px] border-[gray]">
              //     <AiOutlineSearch className="cursor-pointer text-[23px] " />
              //     <input type="text" placeholder="Start typing to search" className="text-[gray] bg-transparent p-2 w-full outline-none border-none" />
              //   </div>
              <div className="dropdown p-[10px] max-h-[360px] overflow-x-hidden overflow-y-auto absolute left-0 top-[41px] w-full bg-black z-20 border-2">
                <div className="flex justify-start place-items-center my-2 gap-[14px] border-b-[1px] border-[gray]">
                  <AiOutlineSearch className="cursor-pointer text-[23px] " />
                  <input
                    type="text"
                    placeholder="Start typing to search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-[gray] bg-transparent p-2 w-full outline-none border-none"
                  />
                </div>
                {coinData.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex cursor-pointer my-1 justify-between place-items-center gap-[10px]"
                    onClick={() => handleSelectSymbol(coin.symbol, coin.id)}
                  >
                    <p>{coin.name}</p>
                    <div className="flex justify-start place-items-center gap-[10px] py-2 my-1 px-1">
                      <h2>{coin.symbol}</h2>
                      <h2 className="p-[5] rounded-full bg-[#D8AE01] w-[20px] h-[20px] flex items-center justify-center">
                        {coin.symbol?.slice(0, 1)}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
              // </div>
            )}
          </div>

          // ====
          <div className="flex justify-start place-items-center border-b-2 text-[white] mt-[20px]">
            <input
              type="number"
              placeholder="Enter Value"
              className="w-[80%] bg-transparent p-2 outline-none "
              value={input2}
              onChange={() => { }}
              readOnly

            />
            <div className="flex justify-start place-items-center gap-[10px]">
              <h2 className=" w-[80px] text-right">BNB</h2>
              <img
                src="./data/b.png"
                alt=""
                className="!w-[20px] !h-[20px] object-contain"
              />
            </div>
          </div>
          {/* --- */}
          <div className="w-full flex justify-between place-items-center my-[10px] p-[20px] text-white">
            <p className="text-white text-[16px]">1 BNB = {bnbPrice} {name}  |  {input1} {name} = 1 BNB</p>


            <MdCompareArrows className="text-[23px] cursor-pointer text-[#EDC524]" />
          </div>
          {
            loading ? <button disabled>X Swap</button> : <button onClick={handleXSwapClick}>X Swap</button>
          }
          <div className="bg-[#0e0d0df5] p-[20px] rounded-sm border-1 border-[rgba(255, 255, 255, 0.05)] my-[28px] text-white">
            <div className="flex justify-between place-items-center my-1 text-[16px]">
              <p>1 BNB Price in {name}</p>
              <p>{bnbPrice} {name}</p>
            </div>
          </div>

          {/* <div className="flex justify-between place-items-center my-1 text-[16px]">
              <p>Price Impact</p>
              <p>48.54%</p>
            </div>
            <div className="flex justify-between place-items-center my-1 text-[16px]">
              <p>Liquidity Provider Fee</p>
              <p>0.11BNB</p>
            </div> */}
        </div>
        {/* ---- */}

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
