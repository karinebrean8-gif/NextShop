import React, { useEffect, useState, useMemo, useRef } from "react";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);

  // ✅ Massive ARRAY DATA (Nested + Rich Structure)
  const fetchProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "iPhone 17",
            category: "Mobile",
            variants: [
              { color: "Black", price: 1200 },
              { color: "Silver", price: 1250 }
            ],
            ratings: [5, 4, 5, 5, 4]
          },
          {
            id: 2,
            name: "MacBook Pro",
            category: "Laptop",
            variants: [
              { color: "Gray", price: 2400 },
              { color: "Black", price: 2500 }
            ],
            ratings: [5, 5, 5, 4]
          },
          {
            id: 3,
            name: "Gaming PC",
            category: "Desktop",
            variants: [
              { color: "RGB", price: 3500 }
            ],
            ratings: [5, 4, 4, 5]
          }
        ]);
      }, 500);
    });
  };

  // ✅ Load Data
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const data = await fetchProducts();
      if (mounted) setProducts(data);
    };

    load();

    return () => (mounted = false);
  }, []);

  // ✅ Derived Data using ARRAY + useMemo
  const enrichedProducts = useMemo(() => {
    return products.map((product) => {
      const avgRating =
        product.ratings.reduce((a, b) => a + b, 0) /
        product.ratings.length;

      const minPrice = Math.min(
        ...product.variants.map((v) => v.price)
      );

      return {
        ...product,
        avgRating: avgRating.toFixed(1),
        minPrice
      };
    });
  }, [products]);

  // ✅ Current Product
  const current = enrichedProducts[index];

  // ✅ Auto Slide (Modulo Logic)
  useEffect(() => {
    if (!products.length || isPaused) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [products, isPaused]);

  // ✅ Manual Controls
  const next = () =>
    setIndex((prev) => (prev + 1) % products.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );

  if (!current) return null;

  return (
    <div
      className="bg-black text-white p-10 rounded-xl text-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="text-2xl font-bold">Featured Product</h2>

      <h1 className="text-4xl mt-4">{current.name}</h1>

      <p className="text-gray-400">{current.category}</p>

      <p className="text-green-400 mt-2">
        Starting from ${current.minPrice}
      </p>

      <p className="text-yellow-400 mt-1">
        ⭐ {current.avgRating}
      </p>

      {/* ✅ ARRAY LOOP (Variants) */}
      <div className="mt-4 flex justify-center gap-3">
        {current.variants.map((v, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            {v.color} - ${v.price}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={prev} className="bg-gray-700 px-4 py-2 rounded">
          Prev
        </button>
        <button onClick={next} className="bg-gray-700 px-4 py-2 rounded">
          Next
        </button>
      </div>

      {/* Indicators (ARRAY MAP) */}
      <div className="flex justify-center mt-4 gap-2">
        {products.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${i === index ? "bg-white" : "bg-gray-500"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;