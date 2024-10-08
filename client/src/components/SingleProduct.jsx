import React from "react";


const SingleProduct = ({ product }) => {
  console.log(product.paymentLink);

  const handleBuyNowClick = () => {
    window.location.href = product.paymentLink;
  };

  return (
    <div className="flex flex-col max-w-[350px] max-h-[500px] w-full bg-gray-200 p-2 rounded-lg shadow-md">
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
          Available quantity: {product?.quantity}
        </p>
      </div>

      <button
        onClick={handleBuyNowClick}
        className="bg-green-600 px-4 py-2 hover:bg-green-700 transition-all rounded-lg text-white font-semibold w-full"
      >
        Buy Now
      </button>
    </div>
  );
};

export default SingleProduct;
