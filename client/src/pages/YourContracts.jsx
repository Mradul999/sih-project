import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const YourContracts = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [contracts, setContracts] = useState([]);
  console.log(contracts);

  useEffect(() => {
    const getAllContracts = async () => {
      try {
        const response = await axios.get("/api/contract/getallcontracts", {
          userId: currentUser._id,
        });
        if (response.status === 200) {
            
          setContracts(response.data);
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    if (currentUser) {
      getAllContracts();
    }
  }, [currentUser]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contracts.map((contract) => (
        <div
          key={contract._id}
          className="bg-white text-xl p-6 rounded-lg shadow-lg transition-shadow"
        >
          <p className="text-gray-700">{`Buyer: ${contract.buyer?contract.buyer:"No buyer"}`}</p>
          <p className="text-gray-700">{`Farmer: ${contract.farmer?contract.farmer:"No farmer"}`}</p>
          <p className={`${contract.contractStatus==="Active"?"text-green-600":"text-red-600"} text-semibold `}>{`Status: ${contract.contractStatus}`}</p>
        </div>
      ))}
    </div>
  );
};

export default YourContracts;
