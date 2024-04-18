import axios from "axios";
import { useEffect, useState } from "react";

const Transactions = ({ transacts }) => {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    getIds();
  }, []);

  const getIds = async () => {
    try {
      let temp = [];
      await Promise.all(
        transacts.map(async (transact) => {
          const data = [transact, 2];
          const getResponse = await axios.get(
            `http://localhost:5555/usernames/${data}`
          );

          const username = getResponse.data;
          temp.push(username.staff[0].id);
        })
      );

      setIds(temp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shadow-md px-20 pt-6 pb-4 border border-gray-300 bg-white/40 rounded-xl">
      <div className="flex flex-col gap-7">
        <h1 className="text-center text-2xl font-semibold">
          Accessible Doctors
        </h1>
        <div className="flex flex-col gap-6 w-full">
          {ids.map((id, index) => (
            <div className="text-black -ml-8" key={index}>
              ⫸ {id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
