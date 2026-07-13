import React, { useEffect, useState } from "react";

const ProductModeration = () => {
  const [products, setProducts] = useState([]);

  const fetchPendingProducts = () =>
    new Promise((resolve) => {
      resolve([
        {
          id: 1,
          name: "iPhone 17",
          seller: "Tech Store"
        },
        {
          id: 2,
          name: "Gaming Laptop",
          seller: "Laptop World"
        }
      ]);
    });

  useEffect(() => {
    const loadProducts = async () => {
      const data =
        await fetchPendingProducts();

      setProducts(data);
    };

    loadProducts();
  }, []);

  const approveProduct = (id) => {
    const updated = [];

    for (const product of products) {
      if (product.id !== id) {
        updated.push(product);
      }
    }

    setProducts(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Product Moderation
      </h1>

      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow p-4 rounded-lg mb-4"
        >
          <h3>{product.name}</h3>

          <p>
            Seller:
            {product.seller}
          </p>

          <button
            onClick={() =>
              approveProduct(
                product.id
              )
            }
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductModeration;