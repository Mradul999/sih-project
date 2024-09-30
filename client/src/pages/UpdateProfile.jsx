import React, { useState } from "react";
import { useSelector } from "react-redux";
import app from "../firebase.js";
import { IoCloudUploadOutline } from "react-icons/io5";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import { updateUser } from '../redux/userSlice'; // Assuming you have an action for updating user

const UpdateProfile = () => {
  //   const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  // console.log("profile image",currentUser.profilePic);

  const [aadhar, setAadhar] = useState("");
  console.log("aadhar", aadhar);
  const [khatoni, setKhatoni] = useState("");

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    phoneNo: currentUser?.phoneNo || "",
    address: currentUser?.address || "",
    pincode: currentUser?.pincode || "",
    state: currentUser?.state || "",
    district: currentUser?.district || "",
    farmSize: currentUser?.farmSize || "",
  });

  //   console.log("formData",formData);

  const handleAadharChange = (e) => {
    setAadhar(e.target.files[0]);
  };

  const handleAadharUplaod = (e) => {
    e.preventDefault();

    if (!aadhar) {
      alert("please select aadhar card");
      return;
    }

    const storage = getStorage(app);
    const aadharName = new Date().getTime() + "-" + aadhar.name;
    const storageRef = ref(storage, `aadhar/${aadharName}`);
    const uploadTask = uploadBytesResumable(storageRef, aadhar);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can also show upload progress here
      },
      (error) => {
        console.error("Upload Error:", error); // Log detailed error information
        alert("Error while uploading aadhar");
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, aadhar: downloadURL });

          alert("Aadhar uploaded successfully");
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUser(formData)); // Dispatching action to update user info
  };

  return (
    <div className="min-h-screen pt-20 bg-green-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full flex">
        <div className="w-1/3 bg-green-600 p-8 hidden lg:block">
          <h2 className="text-3xl font-bold text-white mb-6">
            {currentUser.role === "farmer"
              ? "Update Your Farmer Profile"
              : "Update Your Buyer  Profile"}
          </h2>
          <div className="flex  gap-3 ">
            <img
              className=" rounded-full object-cover size-32 my-2  border-4"
              src={currentUser.profilePic}
              alt=" Profile pic"
            />
       
              <button className="bg-gray-500 p-2 rounded-md my-auto items-center  flex gap-2  text-gray-200  font-semibold">
                Upload
                <IoCloudUploadOutline className="text-white text-xl font-bold" />
              </button>
       
          </div>

          <p className="text-green-100 mb-6">
            Keep your information up to date to get the best farming advice and
            support.
          </p>

          <div className="border-2 border-green-400 rounded-lg p-4">
            <p className="text-green-100 text-sm">
              "The farmer is the only man in our economy who buys everything at
              retail, sells everything at wholesale, and pays the freight both
              ways."
              <br />
              <br />- John F. Kennedy
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 lg:hidden">
            Update Your Farmer Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "name", label: "Name", placeholder: "Enter your name" },
                {
                  name: "phoneNo",
                  label: "Phone Number",
                  placeholder: "Enter your phone number",
                },
                {
                  name: "address",
                  label: "Address",
                  placeholder: "Enter your address",
                },
                {
                  name: "pincode",
                  label: "Pincode",
                  placeholder: "Enter your pincode",
                },
                {
                  name: "state",
                  label: "State",
                  placeholder: "Enter your state",
                },
                {
                  name: "district",
                  label: "District",
                  placeholder: "Enter your district",
                },
                {
                  name: "farmSize",
                  label: "Farm Size (in acres)",
                  placeholder: "Enter your farm size",
                  colSpan: true,
                },
              ].map((field) => (
                <div
                  key={field.name}
                  className={`space-y-2 ${
                    field.colSpan ? "md:col-span-2" : ""
                  }`}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              ))}

              <div className="flex justify-between">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="aadhar">Select aadhar </label>
                  <input
                    accept="application/pdf"
                    name="aadhar"
                    id="aadhar"
                    onChange={handleAadharChange}
                    type="file"
                  />
                  <div className="flex gap-2">
                    <button className="  font-semibold text-gray-700">
                      {" "}
                      <a target="blank" href={currentUser?.aadhar}>
                        {" "}
                        View Aadhar
                      </a>{" "}
                    </button>

                    <button
                      type="button"
                      onClick={handleAadharUplaod}
                      className="bg-green-500 transition-all hover:bg-green-600 p-2 rounded-lg text-white"
                    >
                      Upload aadhar
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="khatoni"> Select khatoni</label>
                  <input
                    accept="application/pdf"
                    id="khatoni"
                    className={` ${currentUser.role === "buyer" && "hidden"}`}
                    name="khatoni"
                    type="file"
                  />
                  <div className="flex gap-2">
                    <button className="font-semibold text-gray-700">
                      {" "}
                      <a target="blank" href={currentUser?.khatoni}>
                        {" "}
                        View Khatoni
                      </a>{" "}
                    </button>
                    <button className="bg-green-500 p-2 rounded-lg text-white transition-all hover:bg-green-600">
                      Upload Khatoni
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
