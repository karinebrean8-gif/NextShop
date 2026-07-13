import React, { useMemo } from "react";

const RecommendationEngine = ({ products }) => {
  const recommended = useMemo(() => {
    let result = [];

    for (const p of products) {
      if (p.rating >= 4) {
        result.push(p);
      }
    }

    return result;
  }, [products]);

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-2">
        Recommended For You
      </h2>

      {recommended.map((p) => (
        <div key={p.id} className="border p-2 mb-2">
          {p.name} ⭐ {p.rating}
        </div>
      ))}
    </div>
  );
};

export default RecommendationEngine;