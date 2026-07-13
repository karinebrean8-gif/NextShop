import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const GlobalDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const fetchGlobalData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 1,
            name: "Shakib Mia",
            role: "ADMIN",
          },
          cart: [
            { id: 1, name: "iPhone 17", price: 120000, qty: 1 },
            { id: 2, name: "MacBook", price: 250000, qty: 1 },
          ],
          notifications: [
            "New Order Received",
            "Stock Low Alert",
            "Payment Success",
          ],
        });
      }, 1000);
    });
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchGlobalData();

      setUser(data.user);
      setCart(data.cart);
      setNotifications(data.notifications);
      setLoading(false);
    };

    load();
  }, []);

  const addToCart = (product) => {
    let updated = [...cart];

    let exists = false;

    for (const item of updated) {
      if (item.id === product.id) {
        item.qty += 1;
        exists = true;
      }
    }

    if (!exists) {
      updated.push({ ...product, qty: 1 });
    }

    setCart(updated);
  };

  const totalPrice = () => {
    let total = 0;

    for (const item of cart) {
      total += item.price * item.qty;
    }

    return total;
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        cart,
        loading,
        notifications,
        addToCart,
        totalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalDataProvider;