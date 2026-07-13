import React, {
  useMemo,
  useState
} from "react";

const CartPage = () => {

  const [cartItems, setCartItems] =
    useState([
      {
        id: 1,
        name: "MacBook Pro",
        price: 250000,
        quantity: 1
      },
      {
        id: 2,
        name: "Magic Mouse",
        price: 12000,
        quantity: 2
      }
    ]);

  const [coupon, setCoupon] =
    useState("");

  const updateQuantity =
    (id, action) => {

      const updated =
        cartItems.map((item) => {

          if (item.id === id) {

            if (
              action === "INC"
            ) {

              return {
                ...item,
                quantity:
                  item.quantity + 1
              };

            }

            if (
              action === "DEC" &&
              item.quantity > 1
            ) {

              return {
                ...item,
                quantity:
                  item.quantity - 1
              };

            }

          }

          return item;

        });

      setCartItems(updated);
    };

  const pricing =
    useMemo(() => {

      let subtotal = 0;

      for (const item of cartItems) {

        subtotal +=
          item.price *
          item.quantity;

      }

      let discount = 0;

      if (
        coupon === "SAVE10"
      ) {
        discount =
          subtotal * 0.1;
      }

      const shipping =
        120;

      const tax =
        subtotal * 0.05;

      const total =
        subtotal -
        discount +
        shipping +
        tax;

      return {
        subtotal,
        discount,
        shipping,
        tax,
        total
      };

    }, [cartItems, coupon]);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Cart Page
      </h1>

      {cartItems.map((item) => (

        <div
          key={item.id}
          className="border rounded-lg p-4 mb-4"
        >

          <h3>{item.name}</h3>

          <p>
            ৳ ${item.price}
          </p>

          <div className="flex gap-3 mt-2">

            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  "DEC"
                )
              }
            >
              -
            </button>

            <span>
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  "INC"
                )
              }
            >
              +
            </button>

          </div>

        </div>

      ))}

      <input
        value={coupon}
        onChange={(e) =>
          setCoupon(
            e.target.value
          )
        }
        placeholder="Coupon Code"
        className="border p-2 w-full mb-4"
      />

      <div className="bg-gray-100 p-4 rounded-lg">

        <p>
          Subtotal:
          ৳ ${pricing.subtotal}
        </p>

        <p>
          Discount:
          ৳ ${pricing.discount}
        </p>

        <p>
          Tax:
          ৳ ${pricing.tax}
        </p>

        <p>
          Shipping:
          ৳ ${pricing.shipping}
        </p>

        <h2 className="font-bold text-xl">
          Total:
          ৳ ${pricing.total}
        </h2>

      </div>

    </div>
  );
};

export default CartPage;