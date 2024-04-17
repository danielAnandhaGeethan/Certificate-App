import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const Send = ({ walletAddress, designation, transacts, setTransacts }) => {
  const [id, setId] = useState("");

  const addToCommunications = async () => {
    if (id.length === 0) {
      enqueueSnackbar("Incomplete Data", {
        variant: "warning",
        autoHideDuration: 2000,
      });
      return;
    }

    try {
      const temp = designation === 1 ? 2 : 1;
      const response = await axios.get(
        `http://localhost:5555/usernames/${id}/${temp}`
      );
      const username = response.data;
      let receiver = "";

      if (designation === 1) {
        receiver = username.staff[0].address;
      } else {
        receiver = username.students[0].address;
      }

      const data = [walletAddress, receiver];

      await axios.put(`http://localhost:5555/student/${data}`);

      enqueueSnackbar(
        `${
          designation === 1 ? "Approved for " : "Request sent to "
        } ${receiver}`,
        {
          variant: "success",
          autoHideDuration: 3000,
        }
      );
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Server Error", {
        variant: "warning",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-10 md:mt-20">
      <SnackbarProvider />
      <input
        type="text"
        placeholder={`Enter ${
          designation === "1" ? "Staff" : "Student"
        }'s ID . . .`}
        className="px-5 py-1 text-sm focus:outline-none rounded-2xl text-center border border-gray-300"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={addToCommunications}>
        <span className="bg-blue-500 px-2 py-1 text-sm rounded-full text-black">
          Send
        </span>
      </button>
    </div>
  );
};

export default Send;
