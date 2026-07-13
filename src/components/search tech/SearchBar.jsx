import React, {
  useState,
  useEffect,
} from "react";

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout =
      setTimeout(() => {
        setLoading(true);

        fetch(
          `/api/products/search-suggestions?q=${query}`
        )
          .then((res) =>
            res.json()
          )
          .then((data) => {
            setSuggestions(
              data.results || []
            );
          })
          .catch(console.error)
          .finally(() =>
            setLoading(false)
          );
      }, 400);

    return () =>
      clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(query);
  };

  return (
    <div className="search-wrapper">
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
        />

        <button type="submit">
          Search
        </button>
      </form>

      {loading && (
        <p>Searching...</p>
      )}

      {!!suggestions.length && (
        <ul className="suggestions">
          {suggestions.map(
            (item) => (
              <li
                key={item.id}
                onClick={() =>
                  setQuery(
                    item.name
                  )
                }
              >
                {item.name}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

import React, { useState } from "react";


const handleChange = (value) => {
  setText(value);

  let trimmed = value.trim();

  if (trimmed.length === 0) {
    onSearch([]);
    return;
  }

  const fakeResults = [
    "iphone",
    "laptop",
    "camera",
    "watch",
    "tablet",
  ];

  const filtered = [];

  for (const item of fakeResults) {
    if (item.includes(trimmed.toLowerCase())) {
      filtered.push(item);
    }
  }

  onSearch(filtered);
};

return (
  <div className="w-full p-3 bg-white shadow flex gap-2">
    <input
      value={text}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Search anything..."
      className="w-full border p-2 rounded"
    />
  </div>
);


export default SearchBar;