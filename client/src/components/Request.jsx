import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const Request = ({ walletAddress, transacts, setTransacts }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  });

  const getRequests = async () => {
    if (walletAddress === "") {
      enqueueSnackbar("Not Logged In", {
        variant: "warning",
        autoHideDuration: 4000,
      });
      return;
    }

    const data = [walletAddress];

    axios
      .get(`http://localhost:5555/student/${data}`)
      .then((res) => {
        const data = res.data.communications;

        setRequests(data);
      })
      .catch((err) => {
        enqueueSnackbar("Server Error !!!", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const addToStaff = (receiver) => {
    const data = [walletAddress, receiver];

    axios
      .put(`http://localhost:5555/student/${data}`)
      .then((res) => {
        removeRequest(receiver);

        enqueueSnackbar(`Approved for ${receiver}`, {
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
        transactions: [...transacts, receiver],
      })
      .then((res) => {
        setTransacts([...transacts, receiver]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeRequest = (data) => {
    const x = requests.filter((request) => request !== data);

    axios
      .put(
        `http://localhost:5555/student/${walletAddress}/${
          x.length === 0 ? "null" : x.join(",")
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
            <div
              key={index}
              className="bg-white/40 px-10 pt-4 pb-2 rounded-3xl flex flex-col gap-3 shadow-xl w-[500px]"
            >
              <div>
                <h1 className="font-semibold text-[#344966] text-center">
                  {request}
                </h1>
              </div>
              <div className="flex justify-between px-3">
                <button
                  className="text-green-700 font-semibold border border-green-700 rounded-xl px-1"
                  onClick={() => addToStaff(request)}
                >
                  Approve
                </button>
                <button
                  className="text-red-600 font-semibold border border-red-600 rounded-xl px-1"
                  onClick={() => removeRequest(request)}
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-xl font-semibold">!!! No Pending Requests !!!</h1>
        )}
      </div>
    </div>
  );
};

export default Request;
