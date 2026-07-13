import React, { useEffect, useMemo, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1001,
            status: "Delivered",
            amount: 3500
          },
          {
            id: 1002,
            status: "Pending",
            amount: 1500
          },
          {
            id: 1003,
            status: "Cancelled",
            amount: 900
          },
          {
            id: 1004,
            status: "Delivered",
            amount: 7000
          }
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "ALL") {
      return orders;
    }

    return orders.filter(
      order => order.status === statusFilter
    );
  }, [orders, statusFilter]);

  const totalRevenue = useMemo(() => {
    let total = 0;

    for (const order of filteredOrders) {
      if (order.status === "Delivered") {
        total += order.amount;
      }
    }

    return total;
  }, [filteredOrders]);

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  return (
    <div>
      <h1>Order History</h1>

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
      >
        <option value="ALL">All</option>
        <option value="Delivered">Delivered</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <h3>Total Revenue: ৳{totalRevenue}</h3>

      {filteredOrders.map(order => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h4>Order #{order.id}</h4>
          <p>Status: {order.status}</p>
          <p>Amount: ৳${order.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;