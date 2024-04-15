import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";
import Submit from "./Submit";
import Transactions from "./Transactions";
import ViewData from "./ViewData";
import Send from "./Send";
import Request from "./Request";
import request from "../assets/request.png";
import submit from "../assets/submit.png";
import search from "../assets/search.png";
import transact from "../assets/transactions.png";
import send from "../assets/send.png";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../constants/constants";

const Student = ({ walletAddress, setWalletAddress }) => {
  const [current, setCurrent] = useState(1);
  const [transacts, setTransacts] = useState([]);

  useEffect(() => {
    getTransactions();
  });

  const getTransactions = async () => {
    const data = [walletAddress];

    axios
      .get(`http://localhost:5555/student/${data}`)
      .then((res) => {
        const data = res.data.transactions;

        setTransacts(data);
      })
      .catch((err) => {
        enqueueSnackbar("Server Error !!!", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const certificate = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    return certificate;
  };

  return (
    <div className="min-h-screen">
      <SnackbarProvider />
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      <div className="flex flex-col items-center py-28 gap-7">
        <div className="flex justify-center items-center gap-2 fixed h-[8%] rounded-3xl">
          <div
            className={`${
              current === 1 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-3xl flex justify-center items-center`}
          >
            <img
              src={submit}
              alt="Enter"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrent(1)}
            />
          </div>
          <div
            className={`${
              current === 2 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-3xl flex justify-center items-center`}
          >
            <img
              src={transact}
              alt="Transations"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrent(2)}
            />
          </div>
          <div
            className={`${
              current === 3 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-3xl flex justify-center items-center`}
          >
            <img
              src={search}
              alt="View"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrent(3)}
            />
          </div>
          <div
            className={`${
              current === 4 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-3xl flex justify-center items-center`}
          >
            <img
              src={request}
              alt="Requests"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrent(4)}
            />
          </div>
          <div
            className={`${
              current === 5 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-3xl flex justify-center items-center`}
          >
            <img
              src={send}
              alt="Send"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrent(5)}
            />
          </div>
        </div>
        <div className="mt-20">
          {current === 1 ? (
            <Submit walletAddress={walletAddress} getContract={getContract} />
          ) : current === 2 ? (
            <Transactions transacts={transacts} />
          ) : current === 3 ? (
            <ViewData
              walletAddress={walletAddress}
              designation={1}
              getContract={getContract}
            />
          ) : current === 4 ? (
            <Request
              walletAddress={walletAddress}
              transacts={transacts}
              setTransacts={setTransacts}
            />
          ) : (
            <Send
              walletAddress={walletAddress}
              designation="Patient"
              transacts={transacts}
              setTransacts={setTransacts}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
