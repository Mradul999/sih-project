import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users by state from the API whenever the searchTerm changes
    const fetchUsersByState = async () => {
      if (searchTerm.trim() === "") {
        setUsers([]); // Clear users if the search term is empty
        return;
      }

      try {
        const response = await axios.get("/api/auth/getbystate", {
          params: { state: searchTerm }, // Pass the search term as a query parameter
        });
        setUsers(response.data); // Store the response data in the state
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Clear users if there's an error
      }
    };

    fetchUsersByState();
  }, [searchTerm]); // Run the effect whenever searchTerm changes

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search Farmer by State</h1>
      <input
        type="text"
        placeholder="Enter state"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              {user.role === "farmer" ? "Farmer name: " : "Buyer Name"}
              {user.name}
            </h2>
            <p>State: {user.state}</p>
            <p>Phone No: {user.phoneNo}</p>
            <p>Pincode: {user.pincode}</p>
            <p>District: {user.district}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
