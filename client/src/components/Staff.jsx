import React from "react";
import Navbar from "./Navbar";

const Staff = ({ walletAddress, setWalletAddress }) => {
  return (
    <div>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
    </div>
  );
};

export default Staff;
