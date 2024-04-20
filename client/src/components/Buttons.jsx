import React from "react";

const Buttons = ({ walletAddress, logout, disconnect }) => {
  return (
    <>
      {window.location.href !== "http://localhost:3000/" ? (
        <div className="cursor-pointer" onClick={logout}>
          <h1 className="font-sans text-white text-[15px] bg-black px-2 py-1 mr-5 mt-4 rounded-xl text-center">
            Log out
          </h1>
        </div>
      ) : (
        ""
      )}

      {walletAddress !== null ? (
        <div className="cursor-pointer" onClick={disconnect}>
          <h1 className="font-sans text-white text-[15px] bg-black px-2 py-1 mr-5 mt-4 rounded-xl text-center">
            Disconnect
          </h1>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Buttons;
