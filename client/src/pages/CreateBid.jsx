import React, { useState } from 'react';
import axios from 'axios'; // Optional: If you plan to submit the form data to a backend

const CreateBid = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    buyerName: '',
    buyerFatherName: '',
    buyerAge: '',
    quantity: '',
    quality: '',
    amount: '',
    startDate: '',
    endDate: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation if needed

    try {
      // Example: Sending form data to a backend API
      const response = await axios.post('/api/bids/create', formData);
      if (response.status === 201) {
        alert('Bid created successfully!');
        // Optionally, reset the form
        setFormData({
          cropType: '',
          buyerName: '',
          buyerFatherName: '',
          buyerAge: '',
          quantity: '',
          quality: '',
          amount: '',
          startDate: '',
          endDate: '',
        });
      }
    } catch (error) {
      console.error('Error creating bid:', error);
      alert('Failed to create bid. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create a New Bid</h2>
        <form onSubmit={handleSubmit}>
          {/* Crop Type */}
          <div className="mb-4">
            <label htmlFor="cropType" className="block text-gray-700 mb-2">
              Crop Type
            </label>
            <input
              type="text"
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter crop type"
              required
            />
          </div>

          {/* Buyer Name */}
          <div className="mb-4">
            <label htmlFor="buyerName" className="block text-gray-700 mb-2">
              Buyer Name
            </label>
            <input
              type="text"
              id="buyerName"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter buyer's name"
              required
            />
          </div>

          {/* Buyer Father's Name */}
          <div className="mb-4">
            <label htmlFor="buyerFatherName" className="block text-gray-700 mb-2">
              Buyer's Father's Name
            </label>
            <input
              type="text"
              id="buyerFatherName"
              name="buyerFatherName"
              value={formData.buyerFatherName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter buyer's father's name"
              required
            />
          </div>

          {/* Buyer Age */}
          <div className="mb-4">
            <label htmlFor="buyerAge" className="block text-gray-700 mb-2">
              Buyer's Age
            </label>
            <input
              type="number"
              id="buyerAge"
              name="buyerAge"
              value={formData.buyerAge}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter buyer's age"
              required
              min="1"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">
              Quantity (in Quintals)
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter quantity"
              required
              min="1"
            />
          </div>

          {/* Quality */}
          <div className="mb-4">
            <label htmlFor="quality" className="block text-gray-700 mb-2">
              Quality
            </label>
            <input
              type="text"
              id="quality"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter quality"
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-2">
              Amount (in Rs)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter amount"
              required
              min="1"
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            create Bid
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBid;
