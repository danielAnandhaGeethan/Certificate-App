import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const Submit = ({ getContract }) => {
  const [files, setFiles] = useState([]);
  const [cids, setCids] = useState([]);

  const handleFileChange = (event) => {
    event.preventDefault();
    setFiles([...files, event.target.files[0]]);
  };

  const storeData = async (file, index) => {
    try {
      const data = new FormData();
      data.append("file", file);

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: "38690e4d17a7e4820ed6",
          pinata_secret_api_key:
            "d3199a0a493b914fd974ffa0ba7bb38fbbffc4acd83b6cbc927e42dc8c7cb7ad",
        },
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const sendDataToPinata = async () => {
    if (files.length === 0) {
      enqueueSnackbar("Please upload all the files !!!", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    try {
      const promises = files.map(async (file, index) => {
        const cid = (await storeData(file, index)).data.IpfsHash;
        return cid;
      });

      const uploadedCids = await Promise.all(promises);

      console.log(uploadedCids);
      setFiles([]);

      return uploadedCids;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const uploadedCids = await sendDataToPinata();
      setCids(uploadedCids);
      const certificate = await getContract();

      const txPromises = uploadedCids.map(async (cid) => {
        return await certificate.pushData(cid);
      });

      const transactions = await Promise.all(txPromises);

      transactions.forEach((tx) => {
        console.log(tx);
      });
    } catch (err) {
      console.log(err);
    }
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
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
