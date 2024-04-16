import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { files } from "../constants/constants";

const ViewData = ({ walletAddress, getContract }) => {
  const [cids, setCids] = useState([]);
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [clicked, setClicked] = useState(false);
  const [display, setDisplay] = useState(false);

  const designation = localStorage.getItem("designation");

  const getCids = async () => {
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
        try {
          const certificate = await getContract();
          console.log(certificate);

          const size = (await certificate.getSize(walletAddress)).toNumber();
          console.log(size);

          const temp = [];
          for (let i = 0; i < size; i++) {
            const x = await certificate.getData(walletAddress, i);
            temp.push(x);
          }
          setCids(temp);
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

  const fetchFromPinata = async (cid) => {
    try {
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch file from Pinata");
      }
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error fetching file from Pinata:", error);
      return null;
    }
  };

  const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const handleDownload = async (cid, filename) => {
    const fileBlob = await fetchFromPinata(cid);
    if (fileBlob) {
      downloadFile(fileBlob, filename);
    }
  };

  const handleView = async (cid) => {
    const fileBlob = await fetchFromPinata(cid);
    if (fileBlob) {
      const url = window.URL.createObjectURL(fileBlob);
      window.open(url, "_blank");
      window.URL.revokeObjectURL(url);
    }
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
          onClick={getCids}
        >
          {designation === 1 ? "Get CID" : "Submit"}
        </button>
      </div>
      <div className="flex flex-col gap-7 items-center w-full">
        {cids.map((cid, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 border px-8 py-4 rounded-2xl shadow-lg"
          >
            <h1 className="font-semibold text-[17px] text-center">
              {files[index]}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  handleDownload(cid, `${walletAddress}_${files[index]}`)
                }
                className="bg-[#5E977D] px-2 rounded-full text-[#E5EAD6] hover:scale-105"
              >
                Download
              </button>
              <button
                onClick={() => handleView(cid)}
                className="bg-[#6EAFAF] px-2 text-[#E5EAD6] rounded-full hover:scale-105"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewData;
