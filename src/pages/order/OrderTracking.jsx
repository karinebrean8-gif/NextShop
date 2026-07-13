import React, { useEffect, useMemo, useState } from "react";

const OrderTracking = () => {
  const [order, setOrder] = useState(null);

  const fetchOrder = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "ORD-1001",
          status: "Shipped",
          timeline: [
            "Placed",
            "Confirmed",
            "Packed",
            "Shipped",
          ],
        });
      }, 800);
    });

  useEffect(() => {
    const loadOrder = async () => {
      const result = await fetchOrder();
      setOrder(result);
    };

    loadOrder();
  }, []);

  const progress = useMemo(() => {
    if (!order) return 0;

    let count = 0;

    for (const step of order.timeline) {
      count++;
    }

    return (count / 5) * 100;
  }, [order]);

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold">
        Order #{order.id}
      </h2>

      <div className="w-full bg-gray-200 h-3 rounded mt-4">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 space-y-3">
        {order.timeline.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;