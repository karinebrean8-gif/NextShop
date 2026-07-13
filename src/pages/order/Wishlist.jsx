import React, { useMemo, useState } from "react";

const Wishlist = () => {
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([
    {
      id: 1,
      name: "iPhone 17 Pro"
    },
    {
      id: 2,
      name: "MacBook Pro M6"
    }
  ]);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [items, search]);

  const removeItem = (id) => {
    const updated = [];

    for (const item of items) {
      if (item.id !== id) {
        updated.push(item);
      }
    }

    setItems(updated);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">

      <input
        className="border p-2 w-full mb-4"
        placeholder="Search Wishlist"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between py-3"
        >
          <span>{item.name}</span>

          <button
            onClick={() =>
              removeItem(item.id)
            }
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;