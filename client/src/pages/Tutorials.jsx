import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Tutorials = () => {
  const navigate = useNavigate();

  const clickHandler = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.querySelector("#google-translate-script")) return; // Prevent re-adding the script

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

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
    <div className="relative flex overflow-x-hidden justify-center mx-2">
      <div className="max-w-[1000px] w-full my-4">
        {/* Google Translate Element */}
        <div
          id="google_translate_element"
          className="absolute bottom-4 right-4 z-50" // Position the widget in the bottom-right corner
        ></div>

        <h1 className="text-center font-bold text-2xl mb-6">
          Welcome to Tutorials
        </h1>

        <div className="flex flex-col gap-8">
          {tutorialsData.map((tutorial, index) => (
            <div
              onClick={() => clickHandler(tutorial.path)}
              key={index}
              className="flex bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden min-h-[250px]"
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
