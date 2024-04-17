import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ViewData from "./ViewData";
import Send from "./Send";
import Approves from "./Approves";
import request from "../assets/request.png";
import search from "../assets/search.png";
import send from "../assets/send.png";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../constants/constants";
import axios from "axios";

const Student = ({ walletAddress, setWalletAddress }) => {
  const [current, setCurrent] = useState(1);
  const designation = localStorage.getItem("designation");
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getId();
  });

  const getId = async () => {
    const data = [walletAddress, designation];

    axios
      .get(`http://localhost:5555/usernames/${data}`)
      .then((res) => {
        const username = res.data;

        setId(username.staff[0].id);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5555/clients/${walletAddress}`)
      .then((res) => {
        const client = res.data;

        setName(client.name);
        setAge(client.age);
      })
      .catch((err) => {
        console.log(err);
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
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        id={id}
        name={name}
        age={age}
      />
      <div className="flex flex-col items-center py-28 gap-7">
        <div className="flex justify-center items-center gap-2 fixed h-[8%] rounded-3xl">
          <div
            className={`${
              current === 1 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-full flex justify-center items-center`}
          >
            <img
              src={search}
              alt="View"
              className="h-7 w-7 cursor-pointer"
              onClick={() => setCurrent(1)}
            />
          </div>
          <div
            className={`${
              current === 2 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-full flex justify-center items-center`}
          >
            <img
              src={request}
              alt="Requests"
              className="h-7 w-7 cursor-pointer"
              onClick={() => setCurrent(2)}
            />
          </div>
          <div
            className={`${
              current === 3 ? "bg-[#6B818C]" : "opacity-30"
            } h-full px-3 rounded-full flex justify-center items-center`}
          >
            <img
              src={send}
              alt="Send"
              className="h-7 w-7 cursor-pointer"
              onClick={() => setCurrent(3)}
            />
          </div>
        </div>
        <div className="mt-20">
          {current === 1 ? (
            <ViewData
              walletAddress={walletAddress}
              designation={designation}
              getContract={getContract}
            />
          ) : current === 2 ? (
            <Approves walletAddress={walletAddress} getContract={getContract} />
          ) : (
            <Send walletAddress={walletAddress} designation={designation} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
