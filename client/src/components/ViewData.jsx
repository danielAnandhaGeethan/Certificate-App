import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { files } from "../constants/constants";
import DisplayFiles from "./DisplayFiles";

const ViewData = ({ walletAddress, getContract, id }) => {
  const [cids, setCids] = useState([]);
  const [password, setPassword] = useState("");
  const [uploaded, setUploaded] = useState(true);
  const [cidString, setCidString] = useState("");
  const [display, setDisplay] = useState(false);

  const designation = localStorage.getItem("designation");

  const getCids = async (text) => {
    if (text === "Close") {
      setCids([]);
      setPassword("");
      return;
    }

    if (password.length === 0) {
      enqueueSnackbar("Incomplete Data", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return;
    }

    axios
      .get(`http://localhost:5555/clients/${walletAddress}/${password}`)
      .then(async (res) => {
        try {
          const certificate = await getContract();

          const size = (await certificate.getSize(walletAddress)).toNumber();

          if (size === 0) {
            setUploaded(false);
            return;
          }

          const temp = [];
          for (let i = 0; i < size; i++) {
            const x = await certificate.getData(walletAddress, i);
            temp.push(x);
          }
          setCids(temp);
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
    <div
      className={`${
        uploaded === true && cids.length === 0 ? "mt-10 md:mt-20" : ""
      } flex flex-col gap-10 items-center`}
    >
      <SnackbarProvider />
      <div className="flex gap-3">
        <input
          type="password"
          placeholder="Enter Password . . . "
          className="focus:outline-none text-sm px-2 py-1 rounded-2xl border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 py-1 px-2 text-sm rounded-full text-black/90"
          onClick={(e) => getCids(e.target.innerText)}
        >
          {designation === "1"
            ? cids.length === 0
              ? "Get Data"
              : "Close"
            : "Submit"}
        </button>
      </div>
      <div>
        {uploaded === true ? (
          <div className="flex flex-col gap-7 items-center w-full">
            <DisplayFiles
              data={cids}
              handleDownload={handleDownload}
              handleView={handleView}
              id={id}
            />
          </div>
        ) : designation === "1" ? (
          <div>
            <h1 className="text-xl font-semibold">
              You have not uploaded the certificates yet !!!{" "}
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 justify-center">
              <input
                type="text"
                value={cidString}
                placeholder="Enter the CIDs..."
                className="focus:outline-none text-sm px-2 py-1 rounded-2xl border border-gray-300"
                onChange={(e) => setCidString(e.target.value)}
              />
              <button
                className="bg-blue-500 px-2 text-sm rounded-full text-black/90 w-[61px]"
                onClick={() => setDisplay(!display)}
              >
                {display === true ? "Close" : "Upload"}
              </button>
            </div>
            <div
              className={`${
                display === true
                  ? "flex flex-col gap-7 items-center w-full"
                  : "hidden"
              }`}
            >
              <DisplayFiles
                data={cidString}
                handleDownload={handleDownload}
                handleView={handleView}
                id={id}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewData;
