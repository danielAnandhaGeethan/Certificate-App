import React from "react";
import { files } from "../constants/constants";

const DisplayFiles = ({ data, handleDownload, handleView, id }) => {
  return (
    <div>
      {data.split(",").map((cid, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 border px-10 py-4 rounded-2xl shadow-lg"
        >
          <h1 className="font-semibold text-[16px] text-center text-[#636B61]">
            {files[index]}
          </h1>
          <div className="flex gap-20">
            <button
              onClick={() => handleDownload(cid, `${id}_${files[index]}`)}
              className="bg-[#5E977D] px-2 rounded-full text-[#E5EAD6] hover:scale-105"
            >
              Download
            </button>
            <button
              onClick={() => handleView(cid)}
              className="bg-[#6EAFAF] px-2 rounded-full text-[#E5EAD6] hover:scale-105"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayFiles;
