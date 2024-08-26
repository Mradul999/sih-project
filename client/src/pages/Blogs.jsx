import React, { useState } from "react";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const blogs = [
    {
      title: "Beautiful Sunset",
      description: "A mesmerizing view of the sunset over the ocean. ",
      imageUrl: "https://example.com/images/sunset.jpg",
    },
    {
      title: "Mountain Adventure",
      description: "An adventurous journey through the rugged mountains.",
      imageUrl: "https://example.com/images/mountain.jpg",
    },
    {
      title: "City Lights",
      description: "A stunning view of the city illuminated at night.",
      imageUrl: "https://example.com/images/city-lights.jpg",
    },
    {
      title: "Forest Path",
      description: "A serene walk through a tranquil forest path.",
      imageUrl: "https://example.com/images/forest-path.jpg",
    },
    {
      title: "Desert Dunes",
      description: "Golden sand dunes under the bright blue sky.",
      imageUrl: "https://example.com/images/desert-dunes.jpg",
    },
    {
      title: "Calm Lake",
      description: "A peaceful lake surrounded by lush greenery.",
      imageUrl: "https://example.com/images/calm-lake.jpg",
    },
  ];

 
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-full border rounded-lg mb-4"
        />
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog, index) => (
          <div key={index} className="border p-2 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-fill rounded-lg mb-4"
            />
            <p className="line-clamp-2">{blog.description}</p>
          </div>
        ))}
        {filteredBlogs.length === 0 && <p>No blogs found.</p>}
      </div>
    </div>
  );
};

export default Blogs;
