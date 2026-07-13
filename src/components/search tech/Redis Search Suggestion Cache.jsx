import React, { useState } from "react";

const RedisSearchSuggestionCache = () => {
  const [cache] = useState(new Map());
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const fakeDB = [
    "iphone 17",
    "iphone 15",
    "macbook pro",
    "gaming laptop",
    "android phone",
    "airpods pro",
    "smart watch",
    "dslr camera",
  ];

  const fetchSuggestions = (q) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = fakeDB.filter((item) =>
          item.toLowerCase().includes(q.toLowerCase())
        );
        resolve(filtered);
      }, 400);
    });
  };

  const handleSearch = async (value) => {
    setQuery(value);

    if (cache.has(value)) {
      setResult(cache.get(value));
      return;
    }

    const data = await fetchSuggestions(value);

    cache.set(value, data);
    setResult(data);
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl w-full max-w-md">
      <h2 className="font-bold mb-2">
        Redis Suggestion Cache (Simulated)
      </h2>

      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Search products..."
      />

      <div className="mt-3">
        {result.map((item, i) => (
          <div key={i} className="p-2 hover:bg-gray-100">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedisSearchSuggestionCache;