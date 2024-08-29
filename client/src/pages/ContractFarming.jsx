import React from "react";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ContractFarming = () => {
  return (
    <div className="">
      <div className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg  ">
        <img
          src="https://th.bing.com/th/id/OIP.4OEj5mUH1dOuhRm39uiR1AHaEH?rs=1&pid=ImgDetMain"
          alt="Contract Farming"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold mt-8 p-6">What is Contract Farming?</h1>

      <p className="mt-4 text-xl text-gray-700 p-6">
        Contract farming is one type of farming that can be described as a
        contract or an agreement between a farmer and a buyer. Due to this
        agreement or contract between two people, there would be terms and
        conditions involved in production as well as marketing. In this type of
        farming, the farmer will come to an agreement with the buyer that he
        would produce the quantities of particular agricultural products which
        he has agreed. So, the farmer will need to produce the promised quantity
        of the crop at the specified time, which would be set by the buyer. At
        the same time, the buyer also needs to provide the farmer with the
        necessary inputs required for the farm like preparation of land,
        technical aspects, etc. He should also make sure that he would be buying
        the products.
      </p>

      <div className="flex flex-col lg:flex-row mt-8 gap-6 p-6">
        <NavLink to="/contract-farming/my-contracts">
          <div className="flex-1 bg-blue-100 p-8 rounded-lg shadow-lg text-center cursor-pointer">
            <h2 className="text-3xl font-semibold mb-6 text-blue-800">
              Your Contracts
            </h2>
            <p className="text-blue-700 text-xl">
              View and manage your existing contracts.
            </p>
          </div>
        </NavLink>
        <div className="flex-1">
          <NavLink to="/contract-farming/create-contract">
            <div className="flex-1 bg-green-100 p-8 rounded-lg shadow-lg text-center cursor-pointer">
              <h2 className="text-3xl font-semibold mb-6 text-green-800">
                Create a Contract
              </h2>
              <p className="text-green-700 text-xl">Initiate a new contract.</p>
            </div>
          </NavLink>
        </div>
        <div className="flex-1">
          <NavLink to="/contract-farming/awaiting-contracts">
            <div className="flex-1 bg-yellow-100 p-8 rounded-lg shadow-lg text-center cursor-pointer">
              <h2 className="text-3xl font-semibold mb-6 text-yellow-800">
                Awaiting Contracts
              </h2>
              <p className="text-yellow-700 text-xl">
                Review contracts awaiting your action.
              </p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ContractFarming;
