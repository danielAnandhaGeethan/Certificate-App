import React from "react";
import copy from "../assets/copy.png";

const Approve = ({
  index,
  approve,
  viewCid,
  clicked,
  removeData,
  name,
  age,
  copyToClipboard,
  cids,
}) => {
  return (
    <div>
      <div key={index}>
        <div className="bg-white/40 border border-gray-300 w-[500px] px-10 pt-4 pb-2 rounded-3xl flex flex-col items-center gap-4 shadow-xl">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-lg font-bold">{approve.id}</h1>
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
    </div>
  );
};

export default Approve;
