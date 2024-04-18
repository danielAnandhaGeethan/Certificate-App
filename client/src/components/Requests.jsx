import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Request from "./Request";

const Requests = ({ walletAddress, transacts, setTransacts }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, [walletAddress]);

  const getRequests = async () => {
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
      const requested = response.data.communications;

      let temp = [];
      await Promise.all(
        requested.map(async (request) => {
          const data = [request[0], 2];
          const getResponse = await axios.get(
            `http://localhost:5555/usernames/${data}`
          );

          const username = getResponse.data;
          temp.push({ address: request, id: username.staff[0].id });
        })
      );

      setRequests(temp);
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Server Error !!!", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const addToStaff = (receiver) => {
    const data = [walletAddress, receiver.address[0]];

    axios
      .put(`http://localhost:5555/student/${data}`)
      .then((res) => {
        removeRequest(receiver);

        enqueueSnackbar(`Approved for ${receiver.address[0]}`, {
          variant: "success",
          autoHideDuration: 3000,
        });
      })
      .catch((err) => {
        enqueueSnackbar("Server Error !!!", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });

    axios
      .put("http://localhost:5555/student", {
        address: walletAddress,
        transactions: [...transacts, receiver.address[0]],
      })
      .then((res) => {
        setTransacts([...transacts, receiver.address[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeRequest = (data) => {
    const x = requests.filter((request) => request !== data);

    let y = [];
    for (const item of x) {
      y.push(item.address);
    }

    setRequests(y);
    axios
      .put(
        `http://localhost:5555/student/${walletAddress}/${
          y.length === 0 ? "null" : y.join(",")
        }`
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <SnackbarProvider />
      <div className="flex flex-col gap-4">
        {requests.length !== 0 ? (
          requests.map((request, index) => (
            <Request
              index={index}
              request={request}
              addToStaff={addToStaff}
              removeRequest={removeRequest}
            />
          ))
        ) : (
          <h1 className="text-xl font-semibold">!!! No Pending Requests !!!</h1>
        )}
      </div>
    </div>
  );
};

export default Requests;
