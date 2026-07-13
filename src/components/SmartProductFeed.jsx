import React, {
  useEffect,
  useState,
} from "react";

import ProductGrid from "./ProductGrid";

const SmartProductFeed = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const loadProducts = () => {
    setLoading(true);

    fetch("/api/products/recommended")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addToCart = (product) => {
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  };

  const addWishlist = (product) => {
    fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        product_id: product.id,
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ProductGrid
      products={products}
      onAddToCart={addToCart}
      onWishlist={addWishlist}
    />
  );
};
import React, { useEffect, useState, useMemo } from "react";

const fetchFeed = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "iPhone", rating: 5 },
        { id: 2, name: "Cheap Phone", rating: 2 },
        { id: 3, name: "Gaming Laptop", rating: 5 },
        { id: 4, name: "Old Tablet", rating: 3 }
      ]);
    }, 800);
  });
};

useEffect(() => {
  const load = async () => {
    const data = await fetchFeed();
    setProducts(data);
  };

  load();
}, []);

const recommended = useMemo(() => {
  let result = [];

  for (const p of products) {
    if (p.rating >= 4) {
      result.push(p);
    }
  }

  return result;
}, [products]);

return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">
      Smart Recommendations
    </h2>

    {recommended.map((p) => (
      <div
        key={p.id}
        className="border p-3 mb-2 rounded"
      >
        {p.name} ⭐ {p.rating}
      </div>
    ))}
  </div>
);

export default SmartProductFeed;