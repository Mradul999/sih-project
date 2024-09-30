import React, { useState } from "react";

const YieldPredictor = () => {
  const [formData, setFormData] = useState({
    Crop: "",
    Crop_Year: "",
    Season: "",
    State: "",
    Area: "",
    Production: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // const formBody = new URLSearchParams(formData).toString();
      const response = await fetch(
        "https://ml-model-zcwf.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (result.success) {
        setPrediction(result.message);
      } else {
        throw new Error(result.message);
      }

      setPrediction(result);
    } catch (error) {
      setError(
        "An error occurred while fetching the prediction. Please try again."
      );
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-10 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: Heading, Image, and Text */}
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-green-800">
              Crop Yield Predictor
            </h1>
            <img
              src="yeild.jpg"
              alt="Crop Yield Prediction"
              className="w-full h-72  rounded-lg shadow-md"
            />
            <div className="space-y-4 text-gray-700">
              <p>
                Our Crop Yield Predictor uses advanced machine learning
                algorithms to forecast agricultural output based on various
                environmental and management factors.
              </p>
              <p>
                By inputting details such as crop type, location, weather
                conditions, and farming practices, you can get accurate
                predictions to help optimize your agricultural planning and
                decision-making.
              </p>
              <p>
                This tool is designed to assist farmers, agronomists, and
                agricultural planners in maximizing crop yields and improving
                overall farm productivity.
              </p>
            </div>
          </div>

          {/* Right side: Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">
              Enter Crop Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="Crop"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Crop
                  </label>
                  <input
                    type="text"
                    id="Crop"
                    name="Crop"
                    value={formData.Crop}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="Crop_Year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Crop Year
                  </label>
                  <input
                    type="number"
                    id="Crop_Year"
                    name="Crop_Year"
                    value={formData.Crop_Year}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="Season"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Season
                  </label>
                  <input
                    type="text"
                    id="Season"
                    name="Season"
                    value={formData.Season}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="State"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="State"
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="Area"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Area (hectares)
                  </label>
                  <input
                    type="number"
                    id="Area"
                    name="Area"
                    value={formData.Area}
                    onChange={handleChange}
                    step="any"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="Production"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Production (tons)
                  </label>
                  <input
                    type="number"
                    id="Production"
                    name="Production"
                    value={formData.Production}
                    onChange={handleChange}
                    step="any"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="Annual_Rainfall"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Annual Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    id="Annual_Rainfall"
                    name="Annual_Rainfall"
                    value={formData.Annual_Rainfall}
                    onChange={handleChange}
                    step="any"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="Fertilizer"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fertilizer (kg/ha)
                  </label>
                  <input
                    type="number"
                    id="Fertilizer"
                    name="Fertilizer"
                    value={formData.Fertilizer}
                    onChange={handleChange}
                    step="any"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="Pesticide"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pesticide (kg/ha)
                  </label>
                  <input
                    type="number"
                    id="Pesticide"
                    name="Pesticide"
                    value={formData.Pesticide}
                    onChange={handleChange}
                    step="any"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? "Predicting..." : "Predict Yield"}
              </button>
            </form>
            {prediction && (
              <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <h3 className="font-semibold">Prediction Result:</h3>
                <p>{prediction}</p>
              </div>
            )}
            {error && (
              <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPredictor;
