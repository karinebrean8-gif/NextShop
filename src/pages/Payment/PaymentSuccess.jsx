import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    const saveOrder = async () => {
      await new Promise((res) => setTimeout(res, 500));
      console.log("Order saved successfully");
    };

    saveOrder();
  }, []);

  return (
    <div className="p-10 text-center text-green-600">
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      <p>Your order has been placed.</p>
    </div>
  );
};

export default PaymentSuccess;