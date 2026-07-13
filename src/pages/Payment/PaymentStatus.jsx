import React, { useEffect, useState } from "react";

const PaymentStatus = () => {
  const [status, setStatus] = useState("pending");

  const processPayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 2000);
    });
  };

  useEffect(() => {
    const run = async () => {
      const result = await processPayment();

      if (result === "success") {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    };

    run();
  }, []);

  let ui;

  if (status === "pending") {
    ui = "Processing Payment...";
  } else if (status === "success") {
    ui = "Payment Successful 🎉";
  } else {
    ui = "Payment Failed ❌";
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">{ui}</h1>
    </div>
  );
};

export default PaymentStatus;