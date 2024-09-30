import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";

const categories = [
  {
    name: "Seeds",
    slug: "seeds",
    description: "Discover the latest high-quality seeds for your crops.",
    image: "https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Insecticide",
    slug: "insecticide",
    description: "Find effective solutions for pest control.",
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Fertilizer",
    slug: "fertilizer",
    description: "Enhance your soil and boost crop yields.",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Irrigations",
    slug: "irrigations",
    description: "Efficient watering solutions for your fields.",
    image: "https://images.pexels.com/photos/6969809/pexels-photo-6969809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Crop Commodities",
    slug: "crop-commodities",
    description: "Trade and purchase various crop commodities.",
    image: "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Agro Products",
    slug: "agro-products",
    description: "Explore our range of agricultural products.",
    image: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const products = {
  seeds: [
    {
      id: 1,
      name: "Wheat Seeds",
      brand: "IFFCO",
      description: "Hard red, soft red, and durum wheat options.",
      image: "https://th.bing.com/th/id/OIP.EGsi-Cg4acFDD4narxh4zAHaJj?w=136&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      price: 315,
      originalPrice: 385,
      discount: 18,
      size: "500 g",
    },
    {
      id: 2,
      name: "Sunflower Seeds",
      brand: "IFFCO",
      description: "For oil production and bird feed",
      image: "https://th.bing.com/th?id=OIP.b9upxVdXs3lkQAXXuDhiJQHaFK&w=299&h=208&c=8&rs=1&qlt=30&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 250,
      originalPrice: 300,
      discount: 16,
      size: "250 g",
    },
    {
      id: 3,
      name: "Pumpkin Seeds",
      brand: "IFFCO",
      description: "Add a burst of flavor and color to your dishes.",
      image: "https://th.bing.com/th?id=OIP.5Hn6DtKN8q20k0AqUEHqKgHaHa&w=250&h=250&c=8&rs=1&qlt=30&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 180,
      originalPrice: 200,
      discount: 10,
      size: "100 g",
    },
    {
      id: 4,
      name: "Tomato Seeds",
      brand: "GreenThumb",
      description: "High-yield tomato seeds for your garden.",
      image: "https://th.bing.com/th?id=OIP.pQex-rN6vViGefBWl6dTWgHaF-&w=278&h=224&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 120,
      originalPrice: 150,
      discount: 20,
      size: "50 g",
    },
    {
      id: 5,
      name: "Corn Seeds",
      brand: "FarmFresh",
      description: "GMO-free corn seeds for robust crops.",
      image: "https://th.bing.com/th?id=OIP.lwO1JdmMBSwPIkRyDY2a1wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 280,
      originalPrice: 320,
      discount: 12,
      size: "500 g",
    },
    {
      id: 6,
      name: "Cucumber Seeds",
      brand: "GardenPro",
      description: "Disease-resistant cucumber seeds for bountiful harvests.",
      image: "https://th.bing.com/th?id=OIP.6dO1ZZQa2JMfYXNosRKKowHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 90,
      originalPrice: 100,
      discount: 10,
      size: "25 g",
    },
  ],
  // ... other categories
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = () => {
      setLoading(true);
      const foundCategory = categories.find((cat) => cat.slug === slug);
      setTimeout(() => {
        setCategory(foundCategory || null);
        setLoading(false);
      }, 500);
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50">
        <div className="text-2xl font-semibold text-green-600">Loading...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50">
        <div className="text-2xl font-semibold text-red-600">Category not found</div>
      </div>
    );
  }

  const categoryProducts = products[category.slug] || [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl text-center font-semibold text-green-800 mb-6">
          {category.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white w-80 mx-auto rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 "
                />
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                  {product.discount}% OFF
                </div>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
                  <Heart className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                </div>
                <p className="text-sm text-green-600 mb-2">
                  Saved Price ₹{product.originalPrice - product.price}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full">
                    <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>{product.size}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;