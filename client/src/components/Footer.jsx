import React, { useEffect } from "react";

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
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);
  return (
    <div className=" flex bg-slate-800 justify-between px-10 py-10">
      <h1 className=" text-white font-bold text-2xl">LOGO</h1>
      
        <div id="google_translate_element" className="   "></div>
      
    </div>
  );
};

export default Footer;
