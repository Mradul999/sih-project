import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Store, Wheat, BookOpenText, ReceiptText, Users } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
 
];

const services = [
  {
    title: "Market Place",
    description: "Buy and sell agricultural products with ease",
    icon: Store,
    link: "/all-products",
    color: "bg-blue-100 hover:bg-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Yield Predictor",
    description: "Forecast your crop yields with AI",
    icon: Wheat,
    link: "/yeild-predictor",
    color: "bg-green-100 hover:bg-green-200",
    iconColor: "text-green-600",
  },
  {
    title: "Tutorials",
    description: "Learn best practices and innovative techniques",
    icon: BookOpenText,
    link: "/tutorials",
    color: "bg-yellow-100 hover:bg-yellow-200",
    iconColor: "text-yellow-600",
  },
  {
    title: "Legal Contracts",
    description: "Access customizable, lawyer-approved templates",
    icon: ReceiptText,
    link: "/contract-farming",
    color: "bg-purple-100 hover:bg-purple-200",
    iconColor: "text-purple-600",
  },
  {
    title: "Community",
    description: "Connect with fellow farmers and industry experts",
    icon: Users,
    link: "/communities",
    color: "bg-red-100 hover:bg-red-200",
    iconColor: "text-red-600",
  },
];

const testimonials = [
  {
    name: "John Doe",
    image: "userprofile.jpg",
    text: "This platform has revolutionized my farming practices. The yield predictor is incredibly accurate!",
  },
  {
    name: "Jane Smith",
    image: "userprofile.jpg",
    text: "The community here is amazing. I've learned so much from fellow farmers and experts.",
  },
  {
    name: "Mike Johnson",
    image: "userprofile.jpg",
    text: "The marketplace has helped me find better deals on supplies and sell my produce more efficiently.",
  },
  {
    name: "Emily Brown",
    image: "userprofile.jpg",
    text: "The tutorials section is a goldmine of information. It's like having a farming mentor at your fingertips!",
  },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Optional: easing type
      once: false, // Animation only happens once when scrolled into view
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100  ">
      {/* Image Slider */}
      <div data-aos="fade-down" className="relative w-full h-[600px] overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Agricultural landscape ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full  transition-transform duration-700 ease-in-out ${
              index === currentImageIndex
                ? isAnimating
                  ? "-translate-x-full"
                  : "translate-x-0"
                : index === (currentImageIndex + 1) % images.length
                ? isAnimating
                  ? "translate-x-0"
                  : "translate-x-full"
                : "translate-x-full"
            }`}
          />
        ))}
      </div>

      {/* Our Services Section */}
      <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#F4EEFF' }}>
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 underline">
          Our Services
        </h1>
        <div
          data-aos="fade-up"
          className="grid grid-cols-1  md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {services.slice(0, 3).map((service, index) => (
            <NavLink key={index} to={service.link}>
              <div
                className={`aspect-square ${service.color} rounded-lg shadow-lg overflow-hidden p-4 flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105`}
              >
                <service.icon
                  className={`w-12 h-12 ${service.iconColor} mb-3`}
                />
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
                  {service.title}
                </h3>
                <p className="text-xs text-center text-gray-600">
                  {service.description}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto mt-6">
          {services.slice(3).map((service, index) => (
            <NavLink key={index} to={service.link}>
              <div
                className={`aspect-square ${service.color} rounded-lg shadow-lg overflow-hidden p-4 flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105`}
              >
                <service.icon
                  className={`w-12 h-12 ${service.iconColor} mb-3`}
                />
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
                  {service.title}
                </h3>
                <p className="text-xs text-center text-gray-600">
                  {service.description}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div  data-aos="fade-up" className="   py-16 overflow-hidden" style={{ backgroundColor: '#E7FBE6' }}>
        <div className=" container  mx-auto px-4">
          <h2  className="text-3xl font-bold text-center mb-8 ">
            What Our Users Say
          </h2>
          <div className="relative">
            <div className="flex  animate-slide">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-80 mx-4 hover:scale-110 duration-500    transition-all  bg-gray-100 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
