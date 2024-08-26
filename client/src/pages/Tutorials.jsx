import React from "react";
import { useNavigate } from "react-router-dom";

const Tutorials = () => {
  const navigate = useNavigate();

  const clickHandler = (path) => {
    navigate(path);
  };

  const tutorialsData = [
    {
      title: "Video Tutorials",
      description:
        "Explore a wide range of video tutorials to enhance your knowledge and skills in agriculture, farming techniques, and more.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.ltTc4bxx31QNnJr8wgBHBAHaEt?w=265&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
      path: "/tutorials/video-tutorials",
    },
    {
      title: "Case Studies",
      description:
        "Dive deep into real-world case studies that provide insights and success stories from the field of agriculture.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.nJRasfj54btEGJ-QbDpbPwHaFj?w=180&h=135&c=7&r=0&o=5&dpr=1.4&pid=1.7",
      path: "/tutorials/case-studies",
    },
    {
      title: "Blogs",
      description:
        "Read articles, guides, and blogs related to best practices, innovations, and tips in the agricultural industry.",
      imageUrl:
        "https://th.bing.com/th/id/OIP.JpCzuYr9r2Wce0NUDCvPxgHaE8?rs=1&pid=ImgDetMain",
      path: "/tutorials/blogs",
    },
  ];

  return (
    <div className=" flex overflow-x-hidden justify-center mx-2">
      <div className="max-w-[1000px] w-full my-4">
        <h1 className="text-center font-bold text-2xl mb-6">
          Welcome to Tutorials
        </h1>

        <div className="flex flex-col gap-8">
          {tutorialsData.map((tutorial, index) => (
            <div
              onClick={()=>clickHandler(tutorial.path)}
              key={index}
              className="flex bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 duratio rounded-lg overflow-hidden min-h-[250px]" // Added a min height
            >
              <div className="w-1/3">
                <img
                  src={tutorial.imageUrl}
                  alt={tutorial.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center">
                <h2 className="font-semibold text-3xl mb-2">
                  {tutorial.title}
                </h2>
                <p className="text-gray-600 text-2xl">{tutorial.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
