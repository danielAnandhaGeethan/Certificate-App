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

  return (
    <div className="min-h-screen">
      <SnackbarProvider />
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
      />
      <div className="flex flex-col items-center py-28 gap-7">
        <div className="flex justify-center items-center gap-5 fixed">
          <img
            src={submit}
            alt="Enter"
            className={`${
              current === 1 ? "opacity-100 scale-125" : "opacity-30"
            } h-8 w-8 cursor-pointer`}
            onClick={() => setCurrent(1)}
          />
          <img
            src={transact}
            alt="Transations"
            className={`${
              current === 2 ? "opacity-100 scale-125" : "opacity-30"
            } h-8 w-8 cursor-pointer`}
            onClick={() => setCurrent(2)}
          />
          <img
            src={search}
            alt="View"
            className={`${
              current === 3 ? "opacity-100 scale-125" : "opacity-30"
            } h-8 w-8 cursor-pointer`}
            onClick={() => setCurrent(3)}
          />
          <img
            src={request}
            alt="Requests"
            className={`${
              current === 4 ? "opacity-100 scale-125" : "opacity-30"
            } h-8 w-8 cursor-pointer`}
            onClick={() => setCurrent(4)}
          />
          <img
            src={send}
            alt="Send"
            className={`${
              current === 5 ? "opacity-100 scale-125" : "opacity-30"
            } h-8 w-8 cursor-pointer`}
            onClick={() => setCurrent(5)}
          />
        </div>
        <div className="mt-20">
          {current === 1 ? (
            <Submit walletAddress={walletAddress} />
          ) : current === 2 ? (
            <Transactions transacts={transacts} />
          ) : current === 3 ? (
            <ViewData walletAddress={walletAddress} designation={1} />
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
