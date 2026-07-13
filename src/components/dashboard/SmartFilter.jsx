import React, { useState, useMemo } from "react";

const SmartFilter = ({ products }) => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceLimit, setPriceLimit] = useState(100000);

  const filteredProducts = useMemo(() => {

    let result = [];

    for (let product of products) {

      let searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      let categoryMatch =
        category === ""
          ? true
          : product.category === category;

      let priceMatch =
        product.price <= priceLimit;

      if (
        searchMatch &&
        categoryMatch &&
        priceMatch
      ) {
        result.push(product);
      }
    }

    return result;

  }, [products, search, category, priceLimit]);

  return (
    <div>

      <input
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Phone">Phone</option>
        <option value="Laptop">Laptop</option>
        <option value="Fashion">Fashion</option>
      </select>

      <input
        type="number"
        value={priceLimit}
        onChange={(e) =>
          setPriceLimit(Number(e.target.value))
        }
      />

      <hr />

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))
      ) : (
        <h3>No Product Found</h3>
      )}

    </div>
  );
};

export default SmartFilter;