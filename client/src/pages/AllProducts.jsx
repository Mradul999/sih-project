import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get("/api/product/getallproducts");
        if (response.status === 201) {
          setProducts(response.data);
          setFilteredProducts(response.data); // Initially set all products
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    // Filter products based on category
    const filtered = products.filter((product) =>
      category ? product.category === category : true
    );

    // Further filter products based on search query
    const searched = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(searched);
  }, [category, searchQuery, products]);

  return (
    <div className="min-w-screen px-2  flex gap-10">
      <div className="bg-gray-100 p-2 flex flex-col gap-6 px-6">
        <form className="flex flex-col gap-2">
          <label htmlFor="search">Search for Products</label>
          <input
            type="text"
            id="search"
            className="bg-transparent border-2 border-gray-600 py-2 px-2 text-black rounded-lg placeholder:text-gray-400 placeholder:text-xl"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="border-2 border-gray-600 rounded-lg p-2 mt-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Insecticides">Insecticides</option>
            <option value="Pesticides">Pesticides</option>
            <option value="Hardware">Hardware</option>
            <option value="fertilizer">Fertilizers</option>
            <option value="Seeds">Seeds</option>
            <option value="vegetables">vegetables</option>
            <option value="fruits">Fruits</option>

          </select>
        </form>
        <NavLink to="/add-product">
          <button className="bg-green-600 rounded-lg py-2 px-4 text-white text-semibold">
            Sell your own products
          </button>
        </NavLink>
      </div>
      <div className="my-6  grid md:grid-cols-3 gap-6 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 text-xl">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
