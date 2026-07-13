import React, { useEffect, useState } from "react";

const PromoBanner = () => {
  const [offers, setOffers] = useState([]);

  const fetchOffers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "🔥 50% OFF",
          "🚚 Free Delivery",
          "🎉 Flash Sale",
        ]);
      }, 600);
    });
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchOffers();
      setOffers(data);
    };

    load();
  }, []);

  return (
    <div className="bg-yellow-400 p-6">
      <h2 className="font-bold text-xl">Today's Deals</h2>

      <div className="flex gap-4 mt-2">
        {offers.map((o, i) => (
          <span key={i} className="bg-white px-2 py-1 rounded">
            {o}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;