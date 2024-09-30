import { current } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateContract = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmer: "",
    farmerFather: "",
    farmerFather: "",
    farmerAge: "",
    farmerAddress: "",
    cropType: "",
    quantity: "",
    pricePerUnit: "",
    startDate: "",
    endDate: "",
    minMoney: "",
    buyer: "",
    buyerFather: "",
    buyerAge: "",
    buyerAddress: "",
    farmSize: "",
    paymentTerms: "Advance",
    termsAndConditions: "",
    userId: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prevState) => ({
        ...prevState,
        userId: currentUser._id,
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/contract/createcontract",
        formData
      );
      if (response.status === 201) {
        const contractId = response.data.contractId;

        alert(`${currentUser.role}'s side contract ready`);
        navigate(`/contract-farming/${contractId}`);

        // console.log(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-between  mx-auto mt-8 p-4 space-x-8">

      

      {/* Form */}
      <div className="w-1/2 p-4 mx-auto border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create a New Contract
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={`${currentUser.role==="buyer" &&"hidden"}`}>
            <label className="block text-gray-700 mb-2">Farmer Name</label>
            <input
              type="text"
              name="farmer"
              value={formData.farmer}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  border-gray-300 rounded-lg`}
              required
              disabled={currentUser.role === "buyer"}
            />
          </div>
          <div className={`${currentUser.role==="buyer" &&"hidden"}`}>
            <label className="block text-gray-700 mb-2">
              Farmer's Father's Name
            </label>
            <input
              type="text"
              name="farmerFather"
              value={formData.farmerFather}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role === "buyer"}
            />
          </div>
          <div className={`${currentUser.role==="buyer" &&"hidden"}`}>
            <label className="block text-gray-700 mb-2">Farmer's Address</label>
            <input
              type="text"
              name="farmerAddress"
              value={formData.farmerAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role === "buyer"}
            />
          </div>
          <div className={`${currentUser.role==="buyer" &&"hidden"}`}>
            <label className="block text-gray-700 mb-2">Farmer's Age</label>
            <input
              type="number"
              name="farmerAge"
              value={formData.farmerAge}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role === "buyer"}
            />
          </div>
          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">Crop Type</label>
            <input
              type="text"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">Buyer Name</label>
            <input
              type="text"
              name="buyer"
              value={formData.buyer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role === "farmer"}
            />
          </div>

          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">
              Buyer's Father's Name
            </label>
            <input
              type="text"
              name="buyerFather"
              value={formData.buyerFather}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role === "farmer"}
            />
          </div>

          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">Buyer's Age</label>
            <input
              type="number"
              name="buyerAge"
              value={formData.buyerAge}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role === "farmer"}
            />
          </div>
          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">Buyer's Address</label>
            <input
              type="text"
              name="buyerAddress"
              value={formData.buyerAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role === "farmer"}
            />
          </div>

          <div className={`${currentUser.role==="buyer" &&"hidden"}`}>
            <label className="block text-gray-700 mb-2">
              Farm Size (acres)
            </label>
            <input
              type="number"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={currentUser.role === "buyer"}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Quantity(Quintal)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">Price Per Unit</label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">
              Minimum Money(to be paid by the buyer in case of crop failure)
            </label>
            <input
              type="number"
              name="minMoney"
              value={formData.minMoney}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className={`${currentUser.role==="farmer" && "hidden"}`}>
            <label className="block text-gray-700 mb-2">Payment Terms</label>
            <select
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="Advance">Advance</option>
              <option value="Installment">Installment</option>
              <option value="On Delivery">On Delivery</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Terms and Conditions
            </label>
            <textarea
              placeholder="Enter your terms and conditions "
              name="termsAndConditions"
              value={formData.termsAndConditions}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Create Contract
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;
