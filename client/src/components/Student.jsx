import React from "react";
import Navbar from "./Navbar";

const Student = ({ walletAddress, setWalletAddress }) => {
  return (
    <div>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
    </div>
  );
};

export default Student;
