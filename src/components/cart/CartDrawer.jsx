import React, {
  useEffect,
  useMemo,
  useState
} from "react";

const CartDrawer = ({ isOpen, onClose }) => {

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchCartItems = () => {
    return new Promise((resolve) => {

      setTimeout(() => {

        resolve([
          {
            id: 1,
            name: "iPhone 17 Pro",
            price: 120000,
            quantity: 1
          },
          {
            id: 2,
            name: "AirPods Pro",
            price: 25000,
            quantity: 2
          }
        ]);

      }, 1000);

    });
  };

  useEffect(() => {

    const loadCart = async () => {

      const data =
        await fetchCartItems();

      setCartItems(data);
      setLoading(false);

    };

    loadCart();

  }, []);

  const total =
    useMemo(() => {

      let amount = 0;

      for (const item of cartItems) {

        amount +=
          item.price *
          item.quantity;

      }

      return amount;

    }, [cartItems]);

  const removeItem = (id) => {

    const updated = [];

    for (const item of cartItems) {

      if (item.id !== id) {
        updated.push(item);
      }

    }

    setCartItems(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6 overflow-y-auto">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">
          Shopping Cart
        </h2>

        <button onClick={onClose}>
          ✕
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <>
          {cartItems.map((item) => (

            <div
              key={item.id}
              className="border-b py-4"
            >

              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p>
                Qty: {item.quantity}
              </p>

              <p>
                ৳ ${item.price}
              </p>

              <button
                onClick={() =>
                  removeItem(item.id)
                }
                className="text-red-500 mt-2"
              >
                Remove
              </button>

            </div>

          ))}

          <div className="mt-6">
            <h3 className="font-bold">
              Total:
              ৳ ${total}
            </h3>
          </div>
        </>

      )}

    </div>
  );
};

export default CartDrawer;

