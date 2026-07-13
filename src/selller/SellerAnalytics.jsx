import React, {
  useEffect,
  useState,
  useMemo
} from "react";

const SellerAnalytics = () => {

  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { month: "Jan", sales: 12000 },
          { month: "Feb", sales: 18000 },
          { month: "Mar", sales: 25000 },
          { month: "Apr", sales: 30000 }
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchAnalytics();
      setAnalytics(result);
      setLoading(false);
    };

    loadData();
  }, []);

  const totalRevenue = useMemo(() => {

    let total = 0;

    for (const item of analytics) {
      total += item.sales;
    }

    return total;

  }, [analytics]);

  if (loading) {
    return (
      <div className="p-6">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Seller Analytics
      </h1>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="text-xl font-bold">
          Total Revenue
        </h2>

        <p className="text-3xl font-bold text-green-600">
          ৳ ${totalRevenue}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        {analytics.map((item) => (
          <div
            key={item.month}
            className="bg-white rounded-xl shadow p-4"
          >
            <h3>{item.month}</h3>

            <p className="font-bold">
              ৳ ${item.sales}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default SellerAnalytics;