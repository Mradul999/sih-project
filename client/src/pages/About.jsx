import React from "react";
import { Users, Leaf, TrendingUp, Shield } from "lucide-react";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Optional: easing type
      once: false, // Animation only happens once when scrolled into view
    });
  }, []);
  return (
    <div data-aos="fade-up"  className="min-h-screen bg-green-50 pt-20 pb-10">
      <div  className="container mx-auto px-4">
        <h1   className="text-4xl font-bold text-center text-green-800 mb-8">About Us</h1>
     

        {/* Mission Section */}
        <div  className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At KrishiHal, we're committed to revolutionizing the agricultural sector by bridging the gap between farmers and businesses. Our contract farming platform aims to create sustainable partnerships, ensure fair practices, and boost productivity in the primary sector.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          <FeatureCard 
            icon={<Users className="w-12 h-12 text-green-600" />}
            title="Connect"
            description="Seamlessly connect farmers with businesses, fostering mutually beneficial partnerships."
          />
          <FeatureCard 
            icon={<Leaf className="w-12 h-12 text-green-600" />}
            title="Sustainable Practices"
            description="Promote and support environmentally friendly and sustainable farming methods."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-12 h-12 text-green-600" />}
            title="Boost Productivity"
            description="Provide tools and resources to increase farm yields and overall productivity."
          />
          <FeatureCard 
            icon={<Shield className="w-12 h-12 text-green-600" />}
            title="Fair Agreements"
            description="Ensure transparent and fair contract terms for all parties involved."
          />
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember 
              imageSrc="/api/placeholder/150/150"
              name="Jane Doe"
              role="Founder & CEO"
            />
            <TeamMember 
              imageSrc="/api/placeholder/150/150"
              name="John Smith"
              role="Head of Agriculture"
            />
            <TeamMember 
              imageSrc="/api/placeholder/150/150"
              name="Emily Brown"
              role="Lead Developer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
    {icon}
    <h3 className="text-xl font-semibold text-green-700 mt-4 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamMember = ({ imageSrc, name, role }) => (
  <div className="flex flex-col items-center">
    <img src={imageSrc} alt={name} className="w-32 h-32 rounded-full mb-4 object-cover" />
    <h3 className="text-xl font-semibold text-green-700">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
);

export default About;