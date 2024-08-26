import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import app from "../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imgUploadLoading, setImgUploadLoading] = useState(false);
  const [imgUploadingError, setImgUploadingError] = useState("");
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user);

  // console.log("formData",formData);

  const formChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageHandler = (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setImgUploadLoading(true);
    setImgUploadingError("");

    const storage = getStorage(app);
    const imageName = new Date().getTime() + "-" + image.name; // Added dash for better readability
    const storageRef = ref(storage, `images/${imageName}`); // Use a directory structure for storage path

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can also show upload progress here
      },
      (error) => {
        console.error("Upload Error:", error); // Log detailed error information
        setImgUploadLoading(false);
        setImgUploadingError("Error while uploading image: " + error.message);
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
          setImgUploadLoading(false);
        });
      }
    );
  };

  const submitProductHandler = async (e) => {
    e.preventDefault();
    const formData = {
      ...formData,
      userId: currentUser?.currentUser?._id,
    };
    try {
      const response = await axios.post("/api/product/addproduct", formData);
      if (response.status === 201) {
        alert("Product added successfully");
        setFormData({});
        setImage(null);
        navigate("/all-products");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert("Error occured");
      }
    }
  };

  return (
    <div className="flex bg-gray-100 justify-center items-start    w-screen p-10">
      {/* Left Side: Product Form */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={submitProductHandler} className="flex flex-col gap-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded-lg"
              onChange={formChangeHandler}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Price</label>
            <input
              id="price"
              type="number"
              className="w-full p-2 border rounded-lg"
              onChange={formChangeHandler}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-lg"
              onChange={formChangeHandler}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Category</label>
            <select
              id="category"
              className="border w-full rounded-lg p-2"
              onChange={formChangeHandler}
              required
            >
              <option value="">Select category</option>
              <option value="Hardware">Hardware</option>
              <option value="Seeds">Seeds</option>
              <option value="Insecticides">Insecticides</option>
              <option value="Pesticides">Pesticides</option>
              <option value="Fertilizers">Fertilizers</option>
              <option value="vegetables">vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Add your product
          </button>
        </form>
      </div>

      {/* Right Side: Image Upload Section */}
      <div className="w-1/2 p-6 bg-white shadow-lg  rounded-lg ml-10">
        <form onSubmit={uploadImageHandler} className="flex flex-col gap-6">
          <input
            onChange={imageChangeHandler}
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-lg"
          />
          {imgUploadingError && (
            <span className="text-red-600 font-semibold">
              {imgUploadingError}
            </span>
          )}
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
          >
            {imgUploadLoading ? (
              <div className="flex justify-center">
                <ThreeDots
                  height="30"
                  width="50"
                  radius="9"
                  color="white"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              "Upload your product image"
            )}
          </button>
        </form>
        {formData.image && (
          <div className="mt-4">
            <img src={formData.image} alt="Uploaded" className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
