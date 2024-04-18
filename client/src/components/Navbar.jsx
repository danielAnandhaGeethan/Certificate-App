import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../assets/menu.png";
import Buttons from "./Buttons";

const Navbar = ({ walletAddress, setWalletAddress, id, name, age }) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [display, setDisplay] = useState(false);

  const disconnect = () => {
    setWalletAddress(null);
    localStorage.removeItem("userId");
    navigate("/");
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex justify-center fixed left-0 top-0 border-b">
      <div
        className="absolute flex flex-col md:flex-row left-5 top-5 cursor-pointer gap-3 md:gap-2"
        onClick={() => setDisplay(!display)}
      >
        <h1 className="text-[#506691] text-2xl">{id !== "" ? id : ""}</h1>
        <div
          className={`${
            display === true
              ? "flex"
              : "md:-ml-[90px] md:mt-0 opacity-0 -mt-[28px]"
          } flex-col items-start md:flex-row md:items-end gap-2 transition-margin ease-in-out duration-1000`}
        >
          <h1 className="text-lg text-[#595F5A]">
            Name <span className="text-black font-bold">:</span> {name}
          </h1>
          <h1 className="text-lg text-[#595F5A]">
            Age <span className="text-black font-bold">:</span> {age}
          </h1>
        </div>
      </div>
      <div className="py-4 flex items-center gap-4 relative group inline-block">
        <h1 className="text-3xl font-semibold cursor-pointer text-[#6B818C]">
          ABC University
        </h1>
      </div>
      <div className="flex-row absolute right-0 mt-1 hidden md:flex">
        <Buttons
          walletAddress={walletAddress}
          logout={logout}
          disconnect={disconnect}
        />
      </div>
      <div className="flex flex-col absolute right-0 md:hidden">
        <img
          src={menu}
          alt="menu"
          className="h-9 w-9 cursor-pointer mt-4 ml-10"
          onClick={() => setClicked(!clicked)}
        />
        <div className={`${clicked === true ? "block" : "hidden"}`}>
          <Buttons
            walletAddress={walletAddress}
            logout={logout}
            disconnect={disconnect}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
