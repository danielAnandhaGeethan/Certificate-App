import React, { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("userId") || null
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
