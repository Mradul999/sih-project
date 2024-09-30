import React from 'react';
import { useLocation } from 'react-router-dom';

function CasestudyDetail() {
  const location = useLocation();
  const { title, description, url } = location.state || {};

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={url} alt={title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default CasestudyDetail;
