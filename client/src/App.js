import React, { useState } from "react";
import Home from "./components/Home";
import Student from "./components/Student";
import Staff from "./components/Staff";
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
        />{" "}
        <Route
          path="/student"
          element={
            <Student
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
            />
          }
        />{" "}
        <Route
          path="/staff"
          element={
            <Staff
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
