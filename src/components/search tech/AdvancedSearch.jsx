import React, { useState } from "react";

const AdvancedSearch = () => {
  const [filters, setFilters] = useState({
    category: "",
    price: 0,
    rating: 0,
  });

  const products = [
    { name: "iPhone", price: 120000, rating: 5 },
    { name: "Cheap Phone", price: 10000, rating: 2 },
    { name: "Laptop", price: 90000, rating: 4 },
  ];

  const getResults = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [];

        for (const p of products) {
          if (
            p.price >= filters.price &&
            p.rating >= filters.rating
          ) {
            result.push(p);
          }
        }

        resolve(result);
      }, 500);
    });
  };

  const [results, setResults] = useState([]);

  const search = async () => {
    const data = await getResults();
    setResults(data);
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="font-bold mb-2">Advanced Search</h2>

      <input
        placeholder="Min Price"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            price: Number(e.target.value),
          })
        }
      />

      <input
        placeholder="Min Rating"
        className="border p-2 w-full mb-2"
        onChange={(e) =>
          setFilters({
            ...filters,
            rating: Number(e.target.value),
          })
        }
      />

      <button
        onClick={search}
        className="bg-blue-600 text-white p-2 w-full"
      >
        Search
      </button>

      <div className="mt-3">
        {results.map((r, i) => (
          <div key={i} className="p-2 border">
            {r.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearch;