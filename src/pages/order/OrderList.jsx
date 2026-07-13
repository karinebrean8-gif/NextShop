import React, {
  useMemo,
  useState
} from "react";

const OrderList = () => {

  const [status, setStatus] =
    useState("ALL");

  const orders = [
    {
      id: 1,
      amount: 1500,
      status: "Delivered"
    },
    {
      id: 2,
      amount: 3000,
      status: "Pending"
    },
    {
      id: 3,
      amount: 5000,
      status: "Delivered"
    }
  ];

  const filteredOrders =
    useMemo(() => {

      if (status === "ALL") {
        return orders;
      }

      return orders.filter(
        (order) =>
          order.status === status
      );

    }, [status]);

  const revenue =
    filteredOrders.reduce(
      (sum, order) =>
        sum + order.amount,
      0
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <select
        className="border p-2 mb-4"
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
      >
        <option>ALL</option>
        <option>Delivered</option>
        <option>Pending</option>
      </select>

      <h3 className="mb-4 font-bold">
        Revenue: ৳${revenue}
      </h3>

      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="border p-3 mb-2 rounded"
        >
          Order #{order.id}
          <span className="ml-4">
            {order.status}
          </span>
        </div>
      ))}

    </div>
  );
};

export default OrderList;