import React, { useState } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";

const Home = ({ walletAddress, setWalletAddress }) => {
  const [current, setCurrent] = useState("Login");
  const display = "Your Health, Your Data, Securely Stored.";

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);
        localStorage.setItem("userId", accounts[0]);
      } catch (err) {
        console.log("Connection error : ", err);
      }
    } else {
      console.log("Meta Mask not detected");
    }
  };

  return walletAddress !== null ? (
    <div>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      <div className="flex justify-center items-center h-screen bg-white pt-8">
        <div className="flex flex-col justify-center items-center gap-7">
          <div className="flex items-center gap-10 mb-5">
            <div className="-mb-3">
              <h1 className="text-lg text-black/80 font-semibold">
                Account Address :{" "}
              </h1>
              <h1 className="text-black/80 font-semibold hover:scale-110 text-md">
                {walletAddress || ""}
              </h1>
            </div>
            <div className="mt-4">
              <button
                className="border border-black py-1 px-2 rounded-full hover:scale-105"
                onClick={connectWallet}
              >
                Switch
              </button>
            </div>
          </div>
          <div className="flex grid grid-cols-1 md:grid-cols-2 justify-center shadow-xl rounded-xl h-[385px]">
            <div className="transition-colors duration-400">
              {current === "Login" ? (
                <div className="bg-[#6B818C] h-[385px] rounded-l-xl flex flex-col justify-center rounded-xl">
                  <Login
                    walletAddress={walletAddress}
                    setCurrent={setCurrent}
                  />
                </div>
              ) : (
                <div className="hidden md:block">
                  <h1 className="h-[385px] border border-white/20 flex justify-center items-center rounded-xl">
                    <span className="w-[75%] text-center font-semibold">
                      {display}
                    </span>
                  </h1>
                </div>
              )}
            </div>
            <div className="transition-colors duration-400">
              {current === "Register" ? (
                <div className="bg-[#6B818C] h-[385px] rounded-l-xl flex flex-col justify-center rounded-xl">
                  <Register
                    walletAddress={walletAddress}
                    setCurrent={setCurrent}
                  />
                </div>
              ) : (
                <div className="hidden md:block">
                  <h1 className="h-[385px] border border-white/20 flex justify-center items-center rounded-xl">
                    <span className="w-[75%] text-center font-semibold">
                      {display}
                    </span>
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      <div className="flex flex-col justify-center items-center gap-20 h-screen bg-white">
        <div className="flex flex-col items-center gap-10 bg-[#6B818C] p-20 rounded-xl shadow-xl z-1">
          <h1 className="bg-red-600/60 bg-opacity-70 p-4 text-blue-100 rounded-xl text-md">
            !!! Account Not Connected !!!
          </h1>
          <button
            className="bg-white/70 p-3 rounded-full hover:scale-105 shadow-xl font-semibold border border-white/10"
            onClick={connectWallet}
          >
            Connect Blockchain Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
