import React, { useState } from 'react';

const CreateContract = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    cropType: '',
    quantity: '',
    pricePerUnit: '',
    startDate: '',
    endDate: '',
    minMoney: '',
    buyerName: '',
    paymentTerms: 'advance',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex max-w-7xl mx-auto mt-8 p-4 space-x-8">
      {/* Contract Template */}
      <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Contract Preview</h2>
        <div className="text-gray-700">
          <p><strong>Farmer Name:</strong> {formData.farmerName || '__________'}</p>
          <p><strong>Crop Type:</strong> {formData.cropType || '__________'}</p>
          <p><strong>Quantity:</strong> {formData.quantity || '__________'} units</p>
          <p><strong>Price Per Unit:</strong> ₹{formData.pricePerUnit || '__________'}</p>
          <p><strong>Start Date:</strong> {formData.startDate || '__________'}</p>
          <p><strong>End Date:</strong> {formData.endDate || '__________'}</p>
          <p><strong>Minimum Money (Advance):</strong> ₹{formData.minMoney || '__________'}</p>
          <p><strong>Buyer Name:</strong> {formData.buyerName || '__________'}</p>
          <p><strong>Payment Terms:</strong> {formData.paymentTerms === 'advance' ? 'Advance' : formData.paymentTerms === 'installment' ? 'Installment' : 'On Delivery'}</p>
        </div>
      </div>

      {/* Form */}
      <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create a New Contract</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Farmer Name</label>
            <input
              type="text"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
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
            <label className="block text-gray-700 mb-2">Minimum Money (Advance)</label>
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
            <label className="block text-gray-700 mb-2">Buyer Name</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
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
              <option value="advance">Advance</option>
              <option value="installment">Installment</option>
              <option value="onDelivery">On Delivery</option>
            </select>
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
