import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import CartSummary from "./CartSummary";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = () => {
    setLoading(true);

    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.items || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (id, quantity) => {
    return fetch(`/api/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    })
      .then((res) => res.json())
      .then(() => fetchCart());
  };

  const removeItem = (id) => {
    return fetch(`/api/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchCart());
  };

  return (
    <>
      <CartDrawer
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        loading={loading}
      />

      <CartSummary cartItems={cartItems} />
    </>
  );
};

export default Cart;