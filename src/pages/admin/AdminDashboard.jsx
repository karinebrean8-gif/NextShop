import React, { useEffect, useState, useMemo } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchDashboardStats = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalUsers: 12500,
          totalOrders: 8450,
          totalProducts: 3200,
          revenue: 875000
        });
      }, 1000);
    });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDashboardStats();
      setStats(data);
    };

    loadData();
  }, []);

  const cards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        title: "Users",
        value: stats.totalUsers
      },
      {
        title: "Orders",
        value: stats.totalOrders
      },
      {
        title: "Products",
        value: stats.totalProducts
      },
      {
        title: "Revenue",
        value: `৳${stats.revenue}`
      }
    ];
  }, [stats]);

  if (!stats) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-6"
          >
            <h3 className="text-gray-500">
              {card.title}
            </h3>

            <h2 className="text-2xl font-bold">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;