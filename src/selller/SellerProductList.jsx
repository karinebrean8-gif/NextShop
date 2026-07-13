import React, {
  useEffect,
  useState,
  useMemo
} from "react";

const SellerProductList = () => {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchProducts = () =>
    new Promise((resolve) => {

      resolve([
        {
          id: 1,
          name: "iPhone 17",
          stock: 20,
          price: 120000
        },
        {
          id: 2,
          name: "MacBook Pro",
          stock: 15,
          price: 250000
        },
        {
          id: 3,
          name: "AirPods",
          stock: 0,
          price: 25000
        }
      ]);

    });

  useEffect(() => {

    const loadProducts =
      async () => {

        const result =
          await fetchProducts();

        setProducts(result);

      };

    loadProducts();

  }, []);

  const filteredProducts =
    useMemo(() => {

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [products, search]);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Product List
      </h1>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="border p-3 rounded w-full mb-5"
      />

      <div className="grid md:grid-cols-3 gap-5">

        {filteredProducts.map(
          (product) => (

            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-5"
            >

              <h2 className="font-bold text-lg">
                {product.name}
              </h2>

              <p>
                Price:
                ৳ ${product.price}
              </p>

              <p>
                Stock:
                {product.stock}
              </p>

              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock
                </span>
              ) : (
                <span className="text-red-600">
                  Out Of Stock
                </span>
              )}

            </div>

          ))}

      </div>

    </div>
  );
};

export default SellerProductList;