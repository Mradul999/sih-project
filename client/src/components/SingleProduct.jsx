import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SingleProduct = ({ product }) => {
  const [sellerName, setSellerName] = useState("");

  // useEffect(() => {
  //   // Fetch the seller's information using the userId from the product
  //   const fetchSellerName = async () => {
  //     try {
  //       const userId = product.userId;
  //       // console.log("userId",userId)
  //       const response = await axios.get("/api/auth/getsingleuser", { userId });
  //       console.log(response.data);
  //       setSellerName(response.data.name); // Assuming the user object has a 'name' field
  //     } catch (error) {
  //       console.error("Error fetching seller information:", error);
  //     }
  //   };

  //   fetchSellerName();
  // }, [product.userId]);
  // console.log("product=>", product);

  return (
    <div className="flex flex-col max-w-[300px] max-h-[350px] w-full bg-gray-200 p-2 rounded-lg shadow-md">
      <img
        src={product.image}
        className="w-full h-56 object-fill rounded-md mb-2"
        alt="product image"
      />
      <div className="flex flex-col flex-grow ">
        <span className="text-lg font-semibold mb-1">{product.name}</span>
        <span className="text-sm text-gray-600 mb-1">{product.category}</span>
        <span className="text-md font-semibold mb-2">Rs {product.price}</span>
        <p className="text-sm text-gray-700 mb-4">{product.description}</p>
        <p className="text-sm text-gray-700 mb-4">
          Available quantity:
          {product?.quantity}
        </p>
      </div>
      <NavLink to={`/all-products/payment/${product._id}`}>
        <button className="bg-green-600 px-4 py-2 hover:bg-green-700 transition-all rounded-lg text-white font-semibold w-full">
          Buy Now
        </button>
      </NavLink>
    </div>
  );
};

export default SingleProduct;
