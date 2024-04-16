import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const Approves = ({ walletAddress, getContract }) => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [cids, setCids] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();

  useEffect(() => {
    getApproves();
  });

  const getApproves = async () => {
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
        const approves = res.data.communications;

        setData(approves);
      })
      .catch((err) => {
        enqueueSnackbar("Server Error !!!", {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  const viewCid = async (student) => {
    if (clicked === true) {
      setClicked(!clicked);
      return;
    }

    const certificate = await getContract();

    try {
      const size = (await certificate.getSize(walletAddress)).toNumber();
      console.log(size);

      if (size === 0) {
        return;
      }

      const temp = [];
      for (let i = 0; i < size; i++) {
        const x = await certificate.getData(walletAddress, i);
        temp.push(x);
      }
      setCids(temp);

      axios
        .get(`http://localhost:5555/staff/${student}`)
        .then((res) => {
          setName(res.data.name);
          setAge(res.data.age);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const removeData = (key) => {
    const x = data.filter((datum) => datum !== key);

    axios
      .put(
        `http://localhost:5555/doctor/${walletAddress}/${
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
        {data.length !== 0 ? (
          data.map((data, index) => (
            <div
              key={index}
              className="bg-white/40 border border-gray-300 w-[500px] px-10 pt-4 pb-2 rounded-3xl flex flex-col items-center gap-4 shadow-xl"
            >
              <div>
                <h1 className="text-center">{data}</h1>
              </div>
              <div className="flex justify-between gap-48 px-3">
                <button
                  className="text-blue-600 font-semibold border border-blue-600 rounded-xl px-1"
                  onClick={() => viewCid(data)}
                >
                  View CID
                </button>
                <button
                  className="text-red-600 font-semibold border border-red-600 rounded-xl px-1"
                  onClick={() => removeData(data)}
                >
                  Remove
                </button>
              </div>
              <div
                className={`${
                  clicked === true ? "opacity-100" : "hidden"
                } absolute mt-20 bg-white/30 pt-4 pb-2 w-[500px] text-center rounded-2xl`}
              >
                <h1 className="text-black/80 font-semibold flex justify-between px-8">
                  <span>Name : {name}</span>
                  <span>Age : {age}</span>
                </h1>
                <div>
                  {cids.map((cid, index) => (
                    <h1 className="text-black/80 font-semibold" key={index}>
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
