import React, { useEffect, useMemo, useState } from "react";

const CategorySidebar = ({ onSelectCategory, selected }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Mobile", count: 120 },
          { id: 2, name: "Laptop", count: 80 },
          { id: 3, name: "Fashion", count: 240 },
          { id: 4, name: "Electronics", count: 300 },
          { id: 5, name: "Groceries", count: 90 },
        ]);
      }, 800);
    });
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };

    load();
  }, []);

  const sortedCategories = useMemo(() => {
    let result = [];

    for (const cat of categories) {
      if (cat.count > 0) {
        result.push(cat);
      }
    }

    return result.sort((a, b) => b.count - a.count);
  }, [categories]);

  if (loading) {
    return <div className="p-4">Loading categories...</div>;
  }

  return (
    <div className="w-72 bg-white shadow-xl p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      {sortedCategories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => onSelectCategory(cat.name)}
          className={`flex justify-between p-3 cursor-pointer rounded mb-2 ${selected === cat.name
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
            }`}
        >
          <span>{cat.name}</span>
          <span>{cat.count}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;