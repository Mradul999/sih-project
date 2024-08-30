import React from 'react';

const Communities = () => {
  const communities = [
    {
      id: 1,
      name: 'Organic Farming Community',
      description: 'Connect with fellow organic farmers, share tips, and learn sustainable farming practices.',
      image: 'https://via.placeholder.com/150/9c27b0/ffffff?text=Organic+Farming', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'Hydroponics Enthusiasts',
      description: 'Join the hydroponics community to explore soilless farming techniques and share your experiences.',
      image: 'https://via.placeholder.com/150/3f51b5/ffffff?text=Hydroponics', // Replace with actual image URL
    },
    {
      id: 3,
      name: 'Agri-Tech Innovators',
      description: 'A community for innovators in agriculture technology, where ideas meet implementation.',
      image: 'https://via.placeholder.com/150/ff5722/ffffff?text=Agri-Tech', // Replace with actual image URL
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {communities.map((community) => (
          <div key={community.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={community.image} alt={community.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{community.name}</h2>
              <p className="text-gray-700">{community.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;
