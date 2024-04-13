import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const Submit = () => {
  const [files, setFiles] = useState([]);
  const [cids, setCids] = useState([]);

  const handleFileChange = (event) => {
    event.preventDefault();
    setFiles([...files, event.target.files[0]]);
  };

  const storeData = async (data) => {
    const cid = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: "38690e4d17a7e4820ed6",
          pinata_secret_api_key:
            "d3199a0a493b914fd974ffa0ba7bb38fbbffc4acd83b6cbc927e42dc8c7cb7ad",
        },
      }
    );

    return cid;
  };

  const handleSubmit = async () => {
    if (files.length !== 7) {
      enqueueSnackbar("Please upload all the files !!!", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    const uploadedCids = [];
    for (const file of files) {
      const cid = storeData(file);
      uploadedCids.push(cid);
    }

    setCids(uploadedCids);
    setFiles([]);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 px-7 py-5 rounded-xl shadow-xl border border-[#F5F5F5]]">
        <div className="flex justify-between gap-10">
          <h1>10th Marksheet : </h1>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-between gap-10">
          <h1>12th Marksheet : </h1>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-between gap-10">
          <h1>Aadhar : </h1>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-between gap-10">
          <h1>Community Certificate : </h1>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-between gap-10">
          <h1>Nativity Certificate : </h1>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-between gap-10">
          <h1>Transfer Certificate : </h1>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-between gap-10">
          <h1>Conduct Certificate : </h1>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex justify-center mt-5">
          <button
            className="bg-green-500 px-2 rounded-xl text-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
