import React, {
  useEffect,
  useState,
} from "react";

import LocationBar from "./LocationBar";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const [cartCount, setCartCount] =
    useState(0);

  const [categories, setCategories] =
    useState([]);

  const fetchCartCount = () => {
    return fetch("/api/cart")
      .then((res) =>
        res.json()
      )
      .then((data) => {
        setCartCount(
          data.total_items || 0
        );
      });
  };

  const fetchCategories =
    () => {
      return fetch(
        "/api/categories"
      )
        .then((res) =>
          res.json()
        )
        .then((data) => {
          setCategories(
            data.results || []
          );
        });
    };

  useEffect(() => {
    Promise.all([
      fetchCartCount(),
      fetchCategories(),
    ]).catch(
      console.error
    );
  }, []);

  const handleSearch = (
    query
  ) => {
    window.location.href = `/products?search=${query}`;
  };

  return (
    <header className="navbar">
      <div className="navbar-top">

        <div className="logo">
          ShopMaster
        </div>

        <LocationBar />

        <SearchBar
          onSearch={
            handleSearch
          }
        />

        <div className="cart">
          🛒 {cartCount}
        </div>

      </div>

      <nav className="navbar-menu">
        {categories.map(
          (category) => (
            <a
              key={
                category.id
              }
              href={`/category/${category.slug}`}
            >
              {
                category.name
              }
            </a>
          )
        )}
      </nav>
    </header>
  );
};
import React, { useState } from "react";

const menus = [
  "Home",
  "Shop",
  "Deals",
  "Orders",
  "Support",
];

return (
  <nav className="bg-black text-white p-4">
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-xl">MegaShop</h1>

      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <ul className="hidden md:flex gap-6">
        {menus.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>

    {menuOpen && (
      <div className="md:hidden mt-3">
        {menus.map((m) => (
          <div key={m} className="p-2 border-b">
            {m}
          </div>
        ))}
      </div>
    )}
  </nav>
);


export default NavBar;
