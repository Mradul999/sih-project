import React from 'react'

const bidData = [
    { buyer: "Rahul Sharma", crop: "Wheat", city: "Ludhiana", state: "Punjab", price: 2500 },
    { buyer: "Anita Verma", crop: "Rice", city: "Patna", state: "Bihar", price: 1800 },
    { buyer: "Ravi Kumar", crop: "Sugarcane", city: "Meerut", state: "Uttar Pradesh", price: 3200 },
    { buyer: "Neha Gupta", crop: "Cotton", city: "Nagpur", state: "Maharashtra", price: 2100 },
    { buyer: "Vikram Patel", crop: "Groundnut", city: "Ahmedabad", state: "Gujarat", price: 1500 },
    { buyer: "Aarti Deshmukh", crop: "Soybeans", city: "Indore", state: "Madhya Pradesh", price: 1900 },
    { buyer: "Suresh Reddy", crop: "Paddy", city: "Hyderabad", state: "Telangana", price: 1300 },
    { buyer: "Kiran Rao", crop: "Bajra", city: "Jaipur", state: "Rajasthan", price: 1700 },
    { buyer: "Manoj Yadav", crop: "Maize", city: "Gorakhpur", state: "Uttar Pradesh", price: 2800 },
    { buyer: "Priya Singh", crop: "Mustard", city: "Bharatpur", state: "Rajasthan", price: 2200 },
  ];
  

const AllBids = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 py-6 text-center">
        <h1 className="text-4xl font-bold text-white">Welcome to Bid Zone</h1>
      </header>
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bidData.map((bid, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800 mb-2">{bid.buyer}</h2>
                <p className="text-gray-600"><span className="font-medium">Crop:</span> {bid.crop}</p>
                <p className="text-gray-600"><span className="font-medium">Location:</span> {bid.city}, {bid.state}</p>
                <p className="text-2xl font-bold text-green-600 mt-2">Rs{bid.price}/ton</p>
              </div>
              <div className="flex border-t border-gray-200">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
                  Create Bid
                </button>
                <button className="flex-1 px-4 py-2 bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AllBids