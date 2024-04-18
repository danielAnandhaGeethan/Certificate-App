import React from "react";

const Request = ({ index, request, addToStaff, removeRequest }) => {
  return (
    <div>
      <div
        key={index}
        className="bg-white/40 px-10 pt-3 pb-2 rounded-3xl flex flex-col gap-3 shadow-xl border w-[500px]"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-center text-lg font-bold">{request.id}</h1>
          <h1 className="text-center font-semibold text-[#9BABA5]">
            Comment {"-->"}
            {request.address[1] === "None" ? "-" : request.address[1]}
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
    </div>
  );
};

export default Request;
