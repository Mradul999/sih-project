import React from 'react';
import './service.css';

const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={image} alt={title} />
      </div>
      <div className="service-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        <button className="explore-btn">Explore More...</button>
      </div>
    </div>
  );
};

export default ServiceCard;