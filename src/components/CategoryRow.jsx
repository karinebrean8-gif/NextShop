import React, { useMemo, useState, useEffect } from "react";

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadCategories = async () => {
      const temp = [];

      const categoryNames = [
        "Electronics",
        "Fashion",
        "Mobiles",
        "Laptops",
        "Gaming",
        "Home Appliances",
        "Books",
        "Beauty",
        "Sports",
        "Automotive",
        "Furniture",
        "Groceries",
        "Health",
        "Luxury",
        "Jewelry",
        "Kids",
        "Travel",
        "Smart Home",
        "Office",
        "Industrial",
      ];

      for (let i = 0; i < categoryNames.length; i++) {
        temp.push({
          id: i + 1,
          name: categoryNames[i],
          products: Math.floor(Math.random() * 50000),
          image: `https://picsum.photos/300/300?random=${i}`,
        });
      }

      return Promise.resolve(temp);
    };

    const fetchData = async () => {
      const data = await loadCategories();
      setCategories(data);
    };

    fetchData();
  }, []);

  const renderedCategories = useMemo(() => {
    const list = [];

    for (let i = 0; i < categories.length; i++) {
      list.push(categories[i]);
    }

    return list;
  }, [categories]);

  return (
    <section className="w-full p-6 bg-gray-50">

      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">
          Shop By Categories
        </h2>

        <span className="text-gray-500">
          {categories.length} Categories
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">

        {renderedCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`
              bg-white
              rounded-xl
              shadow-md
              hover:shadow-xl
              cursor-pointer
              transition-all
              overflow-hidden
            `}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold text-lg">
                {category.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {category.products.toLocaleString()} Products
              </p>

              {selectedCategory === category.name && (
                <div className="mt-3 text-green-600 font-semibold">
                  Selected
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default CategoryCard;