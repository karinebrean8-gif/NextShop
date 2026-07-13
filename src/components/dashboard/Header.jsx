import React, { useState } from "react";

const Header = () => {

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const menus = [
    "Home",
    "Products",
    "Deals",
    "Orders",
    "Support"
  ];

  return (
    <header className="bg-white shadow">

      <div className="container mx-auto px-4 py-4 flex justify-between">

        <h1 className="font-bold text-2xl">
          NextShop
        </h1>

        <nav>

          <ul className="hidden md:flex gap-6">

            {menus.map((menu) => (
              <li key={menu}>
                {menu}
              </li>
            ))}

          </ul>

        </nav>

        <button
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
        >
          ☰
        </button>

      </div>

    </header>
  );
};

export default Header;