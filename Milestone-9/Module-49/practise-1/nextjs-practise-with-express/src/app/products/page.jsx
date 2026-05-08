import React from 'react';

const Products = async() => {
    const res = await fetch('http://localhost:7000/products')
    const products = await res.json()

    return (
        <div>
            <h2>Products: {products.length} </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

  {products.map((product) => (
    
    <div
      key={product.id}
      className="bg-white border rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 hover:-translate-y-1"
    >

      {/* Product Name */}
      <h2 className="text-xl font-bold text-gray-800">
        {product.name}
      </h2>

      {/* Brand */}
      <p className="text-sm text-gray-500 mt-1">
        Brand: <span className="font-medium">{product.brand}</span>
      </p>

      {/* Category */}
      <p className="text-sm text-gray-500">
        Category: <span className="font-medium">{product.category}</span>
      </p>

      {/* Price */}
      <p className="text-2xl font-bold text-black mt-3">
        ৳ {product.price}
      </p>

      {/* Stock + Status */}
      <div className="flex items-center justify-between mt-4">

        <p className="text-sm text-gray-600">
          Stock: <span className="font-medium">{product.stock}</span>
        </p>

        {
          product.isAvailable ? (
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Available
            </span>
          ) : (
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          )
        }

      </div>

      {/* Button */}
      <button
        className="mt-5 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>

    </div>

  ))}

</div>
        </div>
    );
};

export default Products;