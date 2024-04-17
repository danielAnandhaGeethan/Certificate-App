import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ walletAddress, setCurrent }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getData = () => {
    if (password === "") {
      enqueueSnackbar("Incomplete Data", {
        variant: "error",
        autoHideDuration: 4000,
      });
      return;
    }

    axios
      .get(`http://localhost:5555/clients/${walletAddress}/${password}`)
      .then((res) => {
        const designation = res.data.designation;
        localStorage.setItem("designation", designation);

        enqueueSnackbar("Logged In successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });

        setTimeout(() => {
          navigate(designation === 1 ? "/student" : "/staff");
        }, 1000);
      })
      .catch((err) => {
        enqueueSnackbar("Incorrect Credentials", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <div className="flex flex-col items-center mt-[80px] gap-10 py-5 px-8">
      <SnackbarProvider />
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl p-1 text-sm bg-opacity-70 bg-white focus:outline-none placeholder:text-xs placeholder:text-gray-500"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="bg-green-600 px-2 py-1 rounded-xl text-sm font-semibold">
          <button onClick={() => getData()}>Login</button>
        </div>
        <div>
          <h1
            className="text-sm text-gray-200 underline cursor-pointer"
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
