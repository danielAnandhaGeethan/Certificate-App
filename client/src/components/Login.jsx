import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ walletAddress, setCurrent }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getData = () => {};

  return (
    <div className="flex flex-col items-center mt-[80px] gap-10 py-5 px-8">
      <SnackbarProvider />
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl p-1 bg-opacity-70 bg-white focus:outline-none placeholder:text-sm"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="bg-green-600 px-2 py-1 rounded-xl">
          <button onClick={() => getData()}>Login</button>
        </div>
        <div>
          <h1
            className="text-sm text-blue-700 underline cursor-pointer"
            onClick={() => setCurrent("Register")}
          >
            New here? Register
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
