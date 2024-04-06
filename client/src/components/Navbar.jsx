import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ walletAddress, setWalletAddress }) => {
  const navigate = useNavigate();

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
        className="py-4 flex items-center gap-4 relative group inline-block"
        onClick={() => navigate("/")}
      >
        <h1 className="text-3xl font-semibold cursor-pointer text-[#6B818C]">
          ABC University
        </h1>
      </div>
      <div className="flex absolute right-0">
        {window.location.href !== "http://localhost:3000/" ? (
          <div className="cursor-pointer" onClick={logout}>
            <h1 className="font-semibold text-white bg-black px-2 py-1 mr-5 mt-4 rounded-xl">
              Log out
            </h1>
          </div>
        ) : (
          ""
        )}

        {walletAddress !== null ? (
          <div className="cursor-pointer" onClick={disconnect}>
            <h1 className="font-semibold text-white bg-black px-2 py-1 mr-5 mt-4 rounded-xl">
              Disconnect
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
