import React, { useEffect, useState } from "react";

const LiveOrderTracker = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 101,
            customer: "Ronald",
            status: "Processing"
          },
          {
            id: 102,
            customer: "Karinebrean",
            status: "Shipped"
          },
          {
            id: 103,
            customer: "Shakib Mia",
            status: "Delivered"
          }
        ]);
      }, 1000);
    });

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };

    loadOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Live Order Tracker
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg bg-white shadow"
          >
            <h3>
              Order #{order.id}
            </h3>

            <p>
              Customer:
              {order.customer}
            </p>

            <p>
              Status:
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveOrderTracker;