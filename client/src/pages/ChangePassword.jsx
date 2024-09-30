import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({});

  const[error,setError]=useState("");
//   console.log(formData);


const  {token}=useParams();
console.log("token",token);

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };



  const submitHandler = async (event) => {
    event.preventDefault();

    if(formData.password!==formData.confirmPassword) {
        setError("Passwords do not match");
        return;

    }

    

  }
  return (
    <div className=" min-h-screen flex justify-center ">
      <div className="flex items-center  min-h-screen bg-gray-100">
        <div className=" w-96  p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
            Reset Password
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col gap-8">
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Enter New Password
              </label>
              <input
                onChange={changeHandler}
                type="password"
                name="password"
                id="password"
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="New password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                onChange={changeHandler}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
