import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import Display from "./Display";

const ViewData = ({ walletAddress, getContract }) => {
  const [cid, setCid] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [display, setDisplay] = useState(false);

  const designation = localStorage.getItem("designation");

  const getCid = async () => {
    if (password.length === 0) {
      enqueueSnackbar("Incomplete Data", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return;
    }

    const credentials = [walletAddress, password];

    axios
      .get(`http://localhost:5555/clients/${credentials}`)
      .then(async (res) => {
        console.log(res);
        const certificate = await getContract();

        try {
          const x = await certificate.getData(walletAddress);
          setCid(x);
          setClicked(true);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Incorrect Credentials", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const getData = () => {
    if (display) {
      setDisplay(!display);
      return;
    }

    axios
      .get(`https://gateway.pinata.cloud/ipfs/${key}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setDisplay(!display);
      })
      .catch((error) => {
        enqueueSnackbar("Server Error !!!", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <div className="flex flex-col gap-7 items-center">
      <SnackbarProvider />
      <div className="flex gap-3">
        <input
          type="password"
          placeholder="Enter Password . . . "
          className="focus:outline-none px-2 py-1 rounded-2xl border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 px-2 rounded-2xl text-black/90"
          onClick={getCid}
        >
          {designation === 1 ? "Get CID" : "Submit"}
        </button>
      </div>
      <div>
        <h1 className="font-semibold text-lg bg-white/30 rounded-full">
          {cid}
        </h1>
      </div>
      <div className={`${clicked ? "opacity-100" : "hidden"} flex gap-3`}>
        <input
          type="text"
          placeholder="Enter CID . . ."
          className="px-5 py-1 rounded-2xl focus:outline-none w-[500px] text-center border border-gray-300"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          className="bg-blue-500 px-2 rounded-2xl text-black/90"
          onClick={getData}
        >
          {!display ? "Display" : "Close"}
        </button>
      </div>
      {data.length === 0 ? "" : <Display data={data} display={display} />}
    </div>
  );
};

export default ViewData;
