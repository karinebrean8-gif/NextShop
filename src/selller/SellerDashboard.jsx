import React, {
  useEffect,
  useState
} from "react";

const SellerDashboard = () => {

  const [stats, setStats] = useState({});

  const fetchStats = () =>
    new Promise((resolve) => {

      setTimeout(() => {

        resolve({
          products: 150,
          orders: 1200,
          revenue: 250000,
          reviews: 450
        });

      }, 800);

    });

  useEffect(() => {

    const loadDashboard = async () => {

      const result =
        await fetchStats();

      setStats(result);

    };

    loadDashboard();

  }, []);

  const cards = [
    {
      title: "Products",
      value: stats.products
    },
    {
      title: "Orders",
      value: stats.orders
    },
    {
      title: "Revenue",
      value: `৳${stats.revenue}`
    },
    {
      title: "Reviews",
      value: stats.reviews
    }
  ];

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Seller Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-5">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white p-5 rounded-xl shadow"
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

export default SellerDashboard;