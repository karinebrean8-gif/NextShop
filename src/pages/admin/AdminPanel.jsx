import React, { useContext, useState } from "react";
import { GlobalContext } from "./GlobalDataProvider";

const AdminPanel = () => {
  const { user, cart, notifications } = useContext(GlobalContext);

  const [tab, setTab] = useState("orders");

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="p-6 text-red-500 font-bold">
        Access Denied (Admin Only)
      </div>
    );
  }

  const tabs = ["orders", "users", "products", "logs"];

  const renderContent = () => {
    if (tab === "orders") {
      return (
        <div>
          <h2 className="font-bold">Recent Orders</h2>

          {cart.map((item) => (
            <div key={item.id} className="border p-2 mt-2">
              {item.name} - Qty: {item.qty}
            </div>
          ))}
        </div>
      );
    }

    if (tab === "users") {
      return <div>Total Users: 1200</div>;
    }

    if (tab === "products") {
      return <div>Product Management Panel</div>;
    }

    if (tab === "logs") {
      return (
        <div>
          {notifications.map((n, i) => (
            <div key={i}>🔔 {n}</div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Admin Control Panel
      </h1>

      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${tab === t
                ? "bg-blue-600 text-white"
                : "bg-white"
              }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;