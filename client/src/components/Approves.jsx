import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import copy from "../assets/copy.png";

const Approves = ({ walletAddress, getContract }) => {
  const [approves, setApproves] = useState([]);
  const [clicked, setClicked] = useState("");
  const [cids, setCids] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    getApproves();
  }, [walletAddress]);

  const getApproves = async () => {
    if (walletAddress === "") {
      enqueueSnackbar("Not Logged In", {
        variant: "warning",
        autoHideDuration: 4000,
      });
      return;
    }

    const address = [walletAddress];

    try {
      const response = await axios.get(
        `http://localhost:5555/student/${address}`
      );
      const approved = response.data.communications;

      let temp = [];
      await Promise.all(
        approved.map(async (approve) => {
          const data = [approve[0], 1];
          const getResponse = await axios.get(
            `http://localhost:5555/usernames/${data}`
          );

          const username = getResponse.data;
          temp.push({ address: approve, id: username.students[0].id });
        })
      );

      setApproves(temp);
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Server Error !!!", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const viewCid = async (receiver) => {
    if (clicked !== "") {
      setClicked("");
      return;
    }

    try {
      const certificate = await getContract();

      const size = (await certificate.getSize(receiver)).toNumber();

      if (size === 0) {
        enqueueSnackbar(`No certificates uploaded for ${receiver}`, {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }

      const temp = [];
      for (let i = 0; i < size; i++) {
        const x = await certificate.getData(receiver, i);
        temp.push(x);
      }
      setCids(temp);

      axios
        .get(`http://localhost:5555/staff/${receiver}`)
        .then((res) => {
          setName(res.data.name);
          setAge(res.data.age);

          setClicked(receiver);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const removeData = (key) => {
    const x = approves.filter((datum) => datum !== key);

    let y = [];
    for (const item of x) {
      y.push(item.address);
    }

    setApproves(y);

    axios
      .put(
        `http://localhost:5555/staff/${walletAddress}/${
          y.length === 0 ? "null" : y.join(",")
        }`
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const copyToClipboard = async (text) => {
    try {
      text = cids.join(",");
      await navigator.clipboard.writeText(text);

      enqueueSnackbar("Copied to Clipboard !! ", {
        variant: "info",
        autoHideDuration: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen">
      <SnackbarProvider />
      <div className="flex flex-col gap-4">
        {approves.length !== 0 ? (
          approves.map((approve, index) => (
            <div key={index}>
              <div className="bg-white/40 border border-gray-300 w-[500px] px-10 pt-4 pb-2 rounded-3xl flex flex-col items-center gap-4 shadow-xl">
                <div className="flex flex-col gap-3">
                  <h1 className="text-center text-lg font-bold">
                    {approve.id}
                  </h1>
                  <h1 className="text-center font-semibold text-[#9BABA5]">
                    Comment {"-->"}
                    {approve.address[1] === "None" ? "-" : approve.address[1]}
                  </h1>
                </div>
                <div className="flex justify-between gap-48 px-3">
                  <button
                    className="text-blue-600 font-semibold border border-blue-600 rounded-xl px-1 w-[85px]"
                    onClick={() => viewCid(approve.address[0])}
                  >
                    {clicked === approve.address[0] ? "Close" : "View CID"}
                  </button>
                  <button
                    className="text-red-600 font-semibold border border-red-600 rounded-xl px-1"
                    onClick={() => removeData(approve)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div
                className={`${
                  clicked === approve.address[0] ? "opacity-100" : "hidden"
                } mt-2 bg-[#6B818C] bg-opacity-80 py-4 w-[500px] text-center rounded-3xl flex flex-col gap-5`}
              >
                <h1 className="text-black/80 font-semibold flex justify-between px-8">
                  <span>Name : {name}</span>
                  <span>Age : {age}</span>
                </h1>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-end px-10">
                    <img
                      src={copy}
                      alt="copy"
                      className="h-5 w-5 cursor-pointer hover:scale-110"
                      onClick={() => copyToClipboard(cids)}
                    />
                  </div>
                  {cids.map((cid, index) => (
                    <h1 className="font-semibold text-[#E5EAD6]/70" key={index}>
                      {cid}
                    </h1>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-2xl font-semibold">!!! No Approves !!!</h1>
        )}
      </div>
    </div>
  );
};

export default Approves;
