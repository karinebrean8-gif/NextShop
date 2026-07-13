import React, { useEffect, useState } from "react";

const DealOfDay = () => {
  const [deal, setDeal] = useState(null);

  const fetchDeal = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "iPhone 17 Pro Max",
          discount: 35,
          stock: 5,
        });
      }, 700);
    });
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchDeal();
      setDeal(data);
    };

    load();
  }, []);

  if (!deal) return <p>Loading Deal...</p>;

  let status;

  if (deal.stock > 10) {
    status = "Available";
  } else if (deal.stock > 0) {
    status = "Limited Stock";
  } else {
    status = "Sold Out";
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="font-bold text-xl">Deal of Day</h2>

      <p>{deal.name}</p>
      <p>{deal.discount}% OFF</p>
      <p>{status}</p>
    </div>
  );
};

export default DealOfDay;