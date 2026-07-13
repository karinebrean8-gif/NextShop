import React, { useEffect, useState } from "react";

const About = () => {
  // ===== STATE =====
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== PROMISE API CALL =====
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ===== ADD TO CART =====
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    // if-else logic
    if (exists) {
      alert("Already in cart!");
    } else {
      setCart([...cart, product]);
    }
  };

  // ===== REMOVE FROM CART =====
  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  };

  // ===== TOTAL PRICE CALCULATION (LOOP) =====
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // ===== UI STATES =====
  if (loading) {
    return <h1 className="text-center text-xl mt-10">Loading products...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-red-500 mt-10">{error}</h1>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-6">
        🛒 Senior E-Commerce Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PRODUCT LIST */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto object-contain"
              />

              <h2 className="font-bold mt-2">
                {product.title.slice(0, 40)}
              </h2>

              <p className="text-green-600 font-semibold">
                ${product.price}
              </p>

              {/* IF-ELSE STYLE CONDITIONAL UI */}
              {cart.find((item) => item.id === product.id) ? (
                <button
                  disabled
                  className="mt-2 w-full bg-gray-400 text-white py-1 rounded"
                >
                  Added ✔
                </button>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>

        {/* CART SECTION */}
        <div className="bg-white p-4 rounded shadow h-fit">
          <h2 className="text-xl font-bold mb-3">
            Cart 🛍 ({cart.length})
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <p className="text-sm">{item.title.slice(0, 20)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {/* TOTAL */}
          <div className="mt-4 font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;