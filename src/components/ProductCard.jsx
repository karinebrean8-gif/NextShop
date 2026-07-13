import React, { useState } from "react";
import React, { useEffect } from 'react'
const ProductCard = ({ product, onAddToCart }) => {
  const [loading, setLoading] = useState(false);

  const addToCart = () => {
    setLoading(true);

    const simulateAPI = new Promise((resolve) => {
      setTimeout(() => {
        resolve("added");
      }, 600);
    });

    simulateAPI.then(() => {
      onAddToCart(product);
      setLoading(false);
    });
  };
  useEffect(() => {
    const loadProduct = async () => {
      const gallery = [];

      for (let i = 1; i <= 8; i++) {
        gallery.push(
          `https://picsum.photos/800/800?random=${productId}${i}`
        );
      }

      const variants = [
        {
          id: 1,
          name: "128GB",
          price: 899,
          stock: 50,
        },
        {
          id: 2,
          name: "256GB",
          price: 999,
          stock: 40,
        },
        {
          id: 3,
          name: "512GB",
          price: 1199,
          stock: 20,
        },
      ];

      return Promise.resolve({
        id: productId,
        title: "Enterprise Flagship Smartphone",
        brand: "TechBrand",
        category: "Electronics",
        rating: 4.8,
        reviews: 14562,
        sold: 68431,
        originalPrice: 1299,
        gallery,
        variants,
        description:
          "Enterprise-grade premium smartphone with AI features, high performance chipset, advanced camera system and long battery life.",
      });
    };


    // BUSINESS LOGIC ENGINE
    let stockStatus;
    let badgeColor;

    if (product.stock > 50) {
      stockStatus = "🔥 High Stock";
      badgeColor = "text-green-600";
    } else if (product.stock > 10) {
      stockStatus = "⚡ Medium Stock";
      badgeColor = "text-yellow-600";
    } else if (product.stock > 0) {
      stockStatus = "⚠ Low Stock";
      badgeColor = "text-orange-600";
    } else {
      stockStatus = "❌ Out of Stock";
      badgeColor = "text-red-600";
    }

    const finalPrice =
      product.price -
      (product.price * product.discount) / 100;

    return (
      <div className="border rounded-xl p-4 shadow hover:shadow-2xl transition bg-white">

        {/* IMAGE SECTION */}
        <div className="h-40 bg-gray-100 flex items-center justify-center mb-3">
          <span className="text-gray-500">
            Product Image
          </span>
        </div>

        {/* TITLE */}
        <h2 className="font-bold text-lg">
          {product.tittle}
        </h2>

        {/* CATEGORY */}
        <p className="text-gray-500 text-sm">
          Category: {product.Category}
        </p>

        {/* PRICE ENGINE */}
        <div className="mt-2">
          <p className="text-green-600 font-bold text-lg">
            ৳ {finalPrice.toFixed(2)}
          </p>

          <p className="text-gray-400 line-through text-sm">
            ৳ ${product.price}
          </p>
        </div>

        {/* STOCK STATUS */}
        <p className={`mt-2 font-semibold ${badgeColor}`}>
          {stockStatus}
        </p>

        {/* RATING ENGINE */}
        <div className="flex gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
              {i < product.rating ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        {/* ADD TO CART */}
        <button
          onClick={addToCart}
          disabled={product.stock === 0 || loading}
          className={`mt-4 w-full p-2 rounded ${product.stock === 0
            ? "bg-gray-400"
            : "bg-blue-600 text-white"
            }`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    );
  })


};
