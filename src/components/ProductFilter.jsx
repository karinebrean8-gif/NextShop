import { useState } from "react";

const ProductFilter = ({ products, setFiltered }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const applyFilter = (searchText, sortType) => {
    let filtered = [...products];

    // SEARCH FILTER
    if (searchText) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // SORTING ENGINE
    if (sortType === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFiltered(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 p-4 border-b">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 flex-1"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          applyFilter(e.target.value, sort);
        }}
      />

      {/* SORT */}
      <select
        className="border p-2"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          applyFilter(search, e.target.value);
        }}
      >
        <option value="">Sort</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilter;