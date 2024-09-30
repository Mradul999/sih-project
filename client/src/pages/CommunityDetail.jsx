import React from "react";
import { useParams } from "react-router-dom";

const CommunityDetail = () => {
  const { id } = useParams();

  const communities = [
    {
      id: 1,
      name: "Organic Farming Community",
      description: "Connect with fellow organic farmers, share tips, and learn sustainable farming practices.",
      image: "https://via.placeholder.com/150/9c27b0/ffffff?text=Organic+Farming",
    },
    {
      id: 2,
      name: "Hydroponics Enthusiasts",
      description: "Join the hydroponics community to explore soilless farming techniques and share your experiences.",
      image: "https://via.placeholder.com/150/3f51b5/ffffff?text=Hydroponics",
    },
    {
      id: 3,
      name: "Agri-Tech Innovators",
      description: "A community for innovators in agriculture technology, where ideas meet implementation.",
      image: "https://via.placeholder.com/150/ff5722/ffffff?text=Agri-Tech",
    },
  ];

  const community = communities.find((c) => c.id === parseInt(id));

  if (!community) {
    return <p>Community not found</p>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{community.name}</h1>
      <img
        src={community.image}
        alt={community.name}
        className="w-full h-64 object-contain rounded-lg mb-4"
      />
      <p>{community.description}</p>
    </div>
  );
};

export default CommunityDetail;
