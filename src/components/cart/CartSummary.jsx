const CartSummary = ({
  cartItems = [],
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity,
    0
  );

  const shipping =
    subtotal > 100 ? 0 : 10;

  const tax = subtotal * 0.15;

  const total =
    subtotal + shipping + tax;

  const handleCheckout = () => {
    fetch("/api/checkout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href =
          data.checkout_url;
      })
      .catch(console.error);
  };

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>

      <p>
        Subtotal:
        ${subtotal.toFixed(2)}
      </p>

      <p>
        Shipping:
        ${shipping.toFixed(2)}
      </p>

      <p>
        Tax:
        ${tax.toFixed(2)}
      </p>

      <hr />

      <h3>
        Total:
        ${total.toFixed(2)}
      </h3>

      <button
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );

  const CartSummary = ({
    items
  }) => {

    const summary =
      useMemo(() => {

        let totalItems = 0;

        let totalAmount = 0;

        let outOfStock = false;

        for (const item of items) {

          totalItems +=
            item.quantity;

          totalAmount +=
            item.price *
            item.quantity;

          if (
            item.stock <= 0
          ) {

            outOfStock = true;

          }

        }

        return {
          totalItems,
          totalAmount,
          outOfStock
        };

      }, [items]);

    return (
      <div className="bg-white shadow rounded-xl p-6">

        <h2 className="text-xl font-bold mb-4">
          Order Summary
        </h2>

        <p>
          Total Items:
          {summary.totalItems}
        </p>

        <p>
          Total Amount:
          ৳ {summary.totalAmount}
        </p>

        {summary.outOfStock ? (

          <div className="mt-4 text-red-500 font-semibold">
            Some items are out of stock
          </div>

        ) : (

          <button
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg"
          >
            Proceed To Checkout
          </button>

        )}

      </div>
    );
  };

}; export default CartSummary;