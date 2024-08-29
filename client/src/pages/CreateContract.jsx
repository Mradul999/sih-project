import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CreateContract = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    farmer: "",
    cropType: "",
    quantity: "",
    pricePerUnit: "",
    startDate: "",
    endDate: "",
    minMoney: "",
    buyer: "",
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
        console.log(response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex max-w-[1100px] mx-auto mt-8 p-4 space-x-8">
      {/* Contract Template */}
      <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Contract Preview
        </h2>
        <div className="text-gray-700">
          <p>
            <strong>Farmer Name:</strong> {formData.farmer || "__________"}
          </p>
          <p>
            <strong>Crop Type:</strong> {formData.cropType || "__________"}
          </p>
          <p>
            <strong>Quantity:</strong> {formData.quantity || "__________"} units
          </p>
          <p>
            <strong>Price Per Unit:</strong> ₹
            {formData.pricePerUnit || "__________"}
          </p>
          <p>
            <strong>Start Date:</strong> {formData.startDate || "__________"}
          </p>
          <p>
            <strong>End Date:</strong> {formData.endDate || "__________"}
          </p>
          <p>
            <strong>Minimum Money:</strong> ₹{formData.minMoney || "__________"}
          </p>
          <p>
            <strong>Buyer Name:</strong> {formData.buyer || "__________"}
          </p>
          <p>
            <strong>Payment Terms:</strong>{" "}
            {formData.paymentTerms}
          </p>
          <p>
            <strong>Terms and Conditions:</strong>{" "}
            {formData.termsAndConditions || "__________"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create a New Contract
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Farmer Name</label>
            <input
              type="text"
              name="farmer"
              value={formData.farmer}
              onChange={handleChange}
              className={`w-full px-3 py-2 border  border-gray-300 rounded-lg`}
              required
              disabled={currentUser.role==="buyer"}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Buyer Name</label>
            <input
              type="text"
              name="buyer"
              value={formData.buyer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              disabled={currentUser.role==="farmer"}
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Minimum Money</label>
            <input
              type="number"
              name="minMoney"
              value={formData.minMoney}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
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
