import React, { useContext, useState } from "react";
import { GlobalContext } from "./GlobalDataProvider";

const CheckoutButton = () => {
  const { cart, totalPrice, user } = useContext(GlobalContext);

  const [status, setStatus] = useState("idle");

  const processPayment = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cart.length === 0) {
          reject("Cart is empty");
        } else {
          resolve("success");
        }
      }, 1500);
    });
  };

  const handleCheckout = async () => {
    setStatus("processing");

    try {
      const result = await processPayment();

      if (result === "success") {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (error) {
      setStatus("failed");
    }
  };

  let ui;

  if (status === "idle") {
    ui = "Place Order";
  } else if (status === "processing") {
    ui = "Processing Payment...";
  } else if (status === "success") {
    ui = "Payment Success 🎉";
  } else {
    ui = "Payment Failed ❌";
  }

  return (
    <div className="p-6 bg-white shadow rounded-xl w-80">
      <h2 className="font-bold text-xl mb-2">
        Checkout Summary
      </h2>

      <p>Total Items: {cart.length}</p>
      <p>Total Price: ৳${totalPrice()}</p>

      <button
        onClick={handleCheckout}
        className={`mt-4 w-full p-3 rounded ${status === "processing"
            ? "bg-gray-400"
            : "bg-blue-600 text-white"
          }`}
        disabled={status === "processing"}
      >
        {ui}
      </button>

      {user?.role === "ADMIN" && (
        <p className="text-xs text-red-500 mt-2">
          Admin detected: test mode enabled
        </p>
      )}
    </div>
  );
};

export default CheckoutButton;