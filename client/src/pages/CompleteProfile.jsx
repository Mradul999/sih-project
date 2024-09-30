import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import app from "../firebase.js";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";

import { FaCheck } from "react-icons/fa6";

import { signinSuccess } from "../redux/user.slice.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const CompleteProfile = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  console.log("formData", formData);
  const [aadharUploading, setAadharUploading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [aadharUploadingError, setAdharUploadingError] = useState("");
  const [aadharSuccess, setAadharSuccess] = useState("");
  const [khatoniSuccess, setKhatoniSuccess] = useState("");
  const [khatoniUploading, setKhatoniUploading] = useState(false);
  const [khatoniUploadingError, setKhatoniUploadingError] = useState("");
  const dispatch = useDispatch((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    setFormData({ ...formData, email: email });
  }, [email]);

  const [file, setFile] = useState({});
  console.log(file);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (e.target.id === "role") {
      setRole(e.target.value); // Update role state when the role changes
    }
  };

  const showPasswordClickHandler = (e) => {
    setShowPassword(!showPassword);
  };

  const fileChangeHandler = (e) => {
    setFile({ ...file, [e.target.id]: e.target.files[0] });
  };

  const uplaodAdhar = async (e) => {
    e.preventDefault();
    setAdharUploadingError("");

    if (!file.aadhar) {
      setAdharUploadingError("Please select Aadhar");
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
        setAdharUploadingError("Error while uploading aadhar");
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, aadhar: downloadURL });
          setAadharSuccess("Aadhar uploaded successfully");
          setAadharUploading(false);
        });
      }
    );
  };

  const uplaodKhatoni = async (e) => {
    e.preventDefault();
    setKhatoniUploadingError("");

    if (!file.khatoni) {
      setKhatoniUploadingError("Please select  Khatoni");
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
        setKhatoniUploadingError("Error while uploading khatoni: ");
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, khatoni: downloadURL });
          setKhatoniSuccess("Khatoni uploaded successfully");
          setKhatoniUploading(false);
        });
      }
    );
  };

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!strongPassword.test(formData.password)) {
        setPasswordError("Password is not strong enough");
        return;
      }

      const response = await axios.post("/api/auth/signup", formData);
      // console.log("response",response);

      if (response.status === 201) {
        toast.success("Registration successfully done.");

        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status == 403) {
          alert("Phone number is already in use,please use a different one");
        } else {
          alert("Internal server error");
        }
      }
    }
  };

  console.log("formData", formData);

  return (
    <div className="flex  bg-gray-100 items-center justify-center mx-2 py-10 min-h-screen  ">
      <div className=" bg-white p-8 rounded-lg shadow-lg w-full  max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete your profile
        </h2>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Full name
              </label>
              <input
                placeholder="Enter your full name"
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
              <div className="flex gap-2 items-center  ">
                <span>+91</span>
                <input
                  placeholder="Enter your 10 digit phone number"
                  onChange={changeHandler}
                  type="tel"
                  id="phoneNo"
                  name="phone"
                  minLength="10"
                  maxLength="10"
                  className="  w-full p-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <div className="flex flex-col gap-1 ">
                <div className="relative">
                  <input
                    placeholder="Enter a strong password eg.Password@1234"
                    onChange={changeHandler}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <FaEyeSlash
                    onClick={showPasswordClickHandler}
                    className={`absolute ${
                      showPassword && "hidden"
                    } right-4 top-4 text-xl`}
                  />
                  <FaEye
                    onClick={showPasswordClickHandler}
                    className={`absolute ${
                      !showPassword && "hidden"
                    } right-4 top-4 text-xl`}
                  />
                </div>

                <div className="text-xs text-blue-600 relative group hover:cursor-pointer font-medium">
                  <span className=" w-44 absolute ">
                    See rules for a strong password
                  </span>

                  <div className="text-sm absolute top-4 pointer-events-none text-white font-medium group-hover:opacity-100 opacity-0 bg-blue-800 rounded-md p-4 transition-opacity duration-200">
                    <ul className="list-disc pl-4">
                      <li>At least 8 characters long</li>
                      <li>Must contain at least one uppercase letter</li>
                      <li>Must contain at least one lowercase letter</li>
                      <li>Must contain at least one number</li>
                      <li>
                        Must contain at least one special character
                        (!@#$%^&amp;*)
                      </li>
                    </ul>
                  </div>
                </div>

                {passwordError && (
                  <span className="mt-3 text-sm text-red-600 font-semibold">
                    {passwordError}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                disabled
                value={email}
                placeholder="Enter your email address"
                type="email"
                id="email"
                name="email"
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
                  placeholder="Enter your Pincode"
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
                  placeholder="Enter your district"
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
                  placeholder="Enter your residential address"
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
                <div className="flex  gap-2 items-center">
                  <button
                    onClick={uplaodAdhar}
                    disabled={formData.aadhar}
                    type="button"
                    className={`  bg-blue-500 py-2 px-4 rounded-lg ${
                      formData.aadhar && "bg-opacity-55 cursor-not-allowed"
                    } text-white mt-2`}
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
                  {aadharUploadingError && (
                    <span className="text-sm font-medium text-red-600">
                      *{aadharUploadingError}
                    </span>
                  )}
                  {aadharSuccess && (
                    <span className="text-green-500 font-medium text-sm">
                      {aadharSuccess}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="GST"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  GST Number
                </label>
                <input
                  placeholder="Enter your GST Number"
                  onChange={changeHandler}
                  type="text"
                  id="GST"
                  name="GST"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  placeholder="Enter your Pincode"
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
                  placeholder="Enter your district"
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
                  placeholder="Enter your residential address"
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
                <div className="flex  gap-2 items-center">
                  <button
                    onClick={uplaodAdhar}
                    disabled={formData.aadhar}
                    type="button"
                    className={`  bg-blue-500 w-44 h-10 rounded-lg ${
                      formData.aadhar && "bg-opacity-55 cursor-not-allowed"
                    } text-white mt-2`}
                  >
                    {aadharUploading ? (
                      <div className="flex justify-center">
                        <ThreeDots
                          height="40"
                          width="50"
                          radius="9"
                          color="white"
                          ariaLabel="loading"
                        />
                      </div>
                    ) : (
                      "Upload your aadhar"
                    )}
                  </button>
                  {aadharUploadingError && (
                    <span className="text-sm font-medium text-red-600">
                      *{aadharUploadingError}
                    </span>
                  )}
                  {aadharSuccess && (
                    <span className="text-green-500 font-medium text-sm">
                      {aadharSuccess}
                    </span>
                  )}
                </div>
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
                <div className="flex gap-2 items-center">
                  <button
                    onClick={uplaodKhatoni}
                    disabled={formData.khatoni}
                    type="button"
                    className={`  bg-blue-500 w-44 h-10  rounded-lg text-white mt-2 ${
                      formData.khatoni && "opacity-55 cursor-not-allowed"
                    }`}
                  >
                    {khatoniUploading ? (
                      <div className="flex  justify-center">
                        <ThreeDots
                          height="40"
                          width="50"
                          radius="9"
                          color="white"
                          ariaLabel="loading"
                        />
                      </div>
                    ) : (
                      "Upload your Khatoni"
                    )}
                  </button>
                  {khatoniUploadingError && (
                    <span className="text-sm font-medium text-red-600">
                      *{khatoniUploadingError}
                    </span>
                  )}
                  {khatoniSuccess && (
                    <span className="text-sm text-green-500 font-medium">
                      {khatoniSuccess}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="farmSize"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Farm Size
                </label>
                <input
                  placeholder="Enter your farm size in acres"
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
      <Toaster />
    </div>
  );
};

export default CompleteProfile;
