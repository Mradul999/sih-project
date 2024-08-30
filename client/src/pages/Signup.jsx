import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import app from "../firebase.js";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user.slice.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const Signup = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [aadharUploading, setAadharUploading] = useState(false);

  const [aadharUploadingError, setAdharUploadingError] = useState("");

  const [khatoniUploading, setKhatoniUploading] = useState(false);

  const [khatoniUploadingError, setKhatoniUploadingError] = useState("");

  const dispatch=useDispatch((state)=>state.user);

  const [file, setFile] = useState({});
  console.log(file);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (e.target.id === "role") {
      setRole(e.target.value); // Update role state when the role changes
    }
  };

  const fileChangeHandler = (e) => {
    setFile({ ...file, [e.target.id]: e.target.files[0] });
  };

  const uplaodAdhar = async (e) => {
    e.preventDefault();

    if (!file.aadhar) {
      alert("please upload aadhar");
      return;
    }
    setAadharUploading(true);
    setAdharUploadingError(false);

    const storage = getStorage(app);
    const aadharName = new Date().getTime() + "-" + file.aadhar.name;
    const storageRef = ref(storage, `aadhar/${aadharName}`);
    const uploadTask = uploadBytesResumable(storageRef, file.aadhar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can also show upload progress here
      },
      (error) => {
        console.error("Upload Error:", error); // Log detailed error information
        setAadharUploading(false);
        setAdharUploadingError(
          "Error while uploading aadhar: " + error.message
        );
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, aadhar: downloadURL });
          setAadharUploading(false);
        });
      }
    );
  };

  const uplaodKhatoni = async (e) => {
    e.preventDefault();

    if (!file.khatoni) {
      alert("please select your khatoni");
      return;
    }
    setKhatoniUploading(true);
    setKhatoniUploadingError(false);

    const storage = getStorage(app);
    const khatoniName = new Date().getTime() + "-" + file.khatoni.name;
    const storageRef = ref(storage, `khatoni/${khatoniName}`);
    const uploadTask = uploadBytesResumable(storageRef, file.khatoni);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can also show upload progress here
      },
      (error) => {
        console.error("Upload Error:", error); // Log detailed error information
        setKhatoniUploading(false);
        setKhatoniUploadingError(
          "Error while uploading khatoni: " + error.message
        );
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, khatoni: downloadURL });
          setKhatoniUploading(false);
        });
      }
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signup", formData);
      // console.log("response",response);

      if (response.status === 201) {
        alert("Signup successful, please login");
    

        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status == 403) {
          alert("user already exist");
        } else {
          alert("Internal server error");
        }
      }
    }
  };

  console.log("formData", formData);

  return (
    <div className="flex bg bg-gray-100 items-center justify-center py-10 min-h-screen  ">
      <div className=" bg-white p-8 rounded-lg shadow-lg w-full  max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                onChange={changeHandler}
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                onChange={changeHandler}
                type="tel"
                id="phoneNo"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                onChange={changeHandler}
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-700 font-semibold mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={changeHandler}
              >
                <option value="">Who are you?</option>
                <option value="buyer">Buyer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
          </div>

          {/* Additional Fields for Buyer */}
          {role === "buyer" && (
            <div id="buyerFields" className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="buyerPincode"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Pincode
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="pincode"
                  name="buyerPincode"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="district"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  District
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="district"
                  name="district"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  State
                </label>
                <select
                  onChange={changeHandler}
                  id="state"
                  name="state"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  {/* Add all Indian states here */}
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="buyerAddress"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Address
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="address"
                  name="buyerAddress"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="buyerAadhaar"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Aadhaar Card
                </label>
                <input
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  type="file"
                  id="aadhar"
                  name="buyerAadhaar"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={uplaodAdhar}
                  type="button"
                  className="  bg-blue-500 py-2 px-4 rounded-lg text-white mt-2"
                >
                  {aadharUploading ? (
                    <div className="flex justify-center">
                      <ThreeDots
                        height="20"
                        width="30"
                        radius="9"
                        color="white"
                        ariaLabel="loading"
                      />
                    </div>
                  ) : (
                    "Upload your Aadhar"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Additional Fields for Farmers */}
          {role === "farmer" && (
            <div id="farmerFields" className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="farmerPincode"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Pincode
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="pincode"
                  name="farmerPincode"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="farmerDistrict"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  District
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="district"
                  name="farmerDistrict"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="farmerState"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  State
                </label>
                <select
                  onChange={changeHandler}
                  id="state"
                  name="farmerState"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  {/* Add all Indian states here */}
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="farmerAddress"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Address
                </label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="address"
                  name="farmerAddress"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="farmerAadhaar"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Aadhaar Card
                </label>
                <input
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  type="file"
                  id="aadhar"
                  name="farmerAadhaar"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={uplaodAdhar}
                  type="button"
                  className="  bg-blue-500 py-2 px-4 rounded-lg text-white mt-2"
                >
                  {aadharUploading ? (
                    <div className="flex justify-center">
                      <ThreeDots
                        height="20"
                        width="30"
                        radius="9"
                        color="white"
                        ariaLabel="loading"
                      />
                    </div>
                  ) : (
                    "Upload your aadhar"
                  )}
                </button>
              </div>
              <div>
                <label
                  htmlFor="farmerKhatoni"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Khatoni
                </label>
                <input
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  type="file"
                  id="khatoni"
                  name="farmerKhatoni"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={uplaodKhatoni}
                  type="button"
                  className="  bg-blue-500 py-2 px-4 rounded-lg text-white mt-2"
                >
                  {khatoniUploading ? (
                    <div className="flex justify-center">
                      <ThreeDots
                        height="20"
                        width="30"
                        radius="9"
                        color="white"
                        ariaLabel="loading"
                      />
                    </div>
                  ) : (
                    "Upload your Khatoni"
                  )}
                </button>
              </div>
              <div>
                <label
                  htmlFor="farmSize"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Farm Size (in acres)
                </label>
                <input
                  onChange={changeHandler}
                  type="number"
                  id="farmSize"
                  name="farmSize"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
