import React, { useEffect } from "react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { Leaf } from "lucide-react";

const Footer = () => {
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
          {
            pageLanguage: "en",
            includedLanguages: "en,hi", // Only English and Hindi
            layout:
              window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-r from-green-800 to-green-900 justify-between gap-3 items-center px-10 py-14">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
        {/* Company Info and Contact */}
        <div className="flex flex-col   md:w-1/2 gap-2">
          <div className="w-full  flex    items-center gap-14">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-green-300" />
              <span className="ml-2 text-gray-300 text-2xl font-bold">
                KrishiHal
              </span>
            </div>

            <div className="flex flex-col gap-2 justify-center items-start">
              <h1 className="text-white font-semibold">Contact us</h1>
              <span className="text-white">+91 9520090880</span>
              <span className="text-white">+91 9534987898</span>
            </div>

            {/* Social Links */}
            <ul className="text-white flex gap-2 items-center">
              <a href="http://www.linkedin.com/in/kapil-gautam-a27028220">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="https://youtube.com/shorts/o41IJ20R_f0?si=M43P7lzQ_BGi8KZV">
                <FaYoutube className="text-2xl" />
              </a>
            </ul>

            {/* Language Translate */}
          </div>
          <div id="google_translate_element" className="mt-4"></div>
        </div>

        {/* Feedback Form */}
        <div className="w-full md:w-1/2 flex flex-col items-end gap-4">
          <h2 className="text-white text-lg   self-center font-semibold">
            We value your feedback
          </h2>
          <form className="flex flex-col gap-3 items-center w-full md:w-3/4 lg:w-2/3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              rows="4"
              placeholder="Your Feedback"
              className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-gray-300 w-full mx-auto h-[1px] rounded-full"></div>

      {/* Footer Bottom Text */}
      <span className="text-white font-semibold">
        © 2024 KrishiHal. All rights reserved
      </span>
    </div>
  );
};

export default Footer;
