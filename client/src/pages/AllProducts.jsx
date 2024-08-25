import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";

const AllProducts = () => {
  const [products, setProducts] = useState(null);
  console.log("products", products);

  useEffect(() => {
    try {
      const getAllProducts = async () => {
        const response = await axios.get("/api/product/getallproducts");
        if (response.status === 201) {
          setProducts(response.data);
        }
      };
      getAllProducts();
    } catch (error) {}
  }, []);

  return (
    <div className="min-w-screen px-2 min-h-screen flex  gap-10">
      <div className="bg-gray-100 p-2 flex flex-col gap-6 px-6">
        <form className="flex flex-col gap-2">
          <label htmlFor="search">Search for Products</label>
          <input
            type="text"
            id="search"
            className="bg-transparent border-2 border-gray-600 py-2 px-2 text-black rounded-lg placeholder:text-gray-400 placeholder:text-xl"
            placeholder="search"
          />

          <select className=" border-2 border-gray-600 rounded-lg p-2 mt-4">
            <option value="">Select Category</option>
            <option value="">Insecticides</option>
            <option value="">Pesticides</option>

            <option value="">Hardware</option>
          </select>
        </form>
        <NavLink to="/add-product">
          <button className="bg-green-600 rounded-lg py-2 px-4 text-white text-semibold">
            Sell your own products
          </button>
        </NavLink>
      </div>
      <div className=" my-2 grid md:grid-cols-3  gap-6 w-full">
        {products?.map((product) => (
          <SingleProduct product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
