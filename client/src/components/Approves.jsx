import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Approve from "./Approve";

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
            <Approve
              index={index}
              approve={approve}
              viewCid={viewCid}
              clicked={clicked}
              removeData={removeData}
              name={name}
              age={age}
              copyToClipboard={copyToClipboard}
              cids={cids}
            />
          ))
        ) : (
          <h1 className="text-2xl font-semibold">!!! No Approves !!!</h1>
        )}
      </div>
    </div>
  );
};

export default Approves;
