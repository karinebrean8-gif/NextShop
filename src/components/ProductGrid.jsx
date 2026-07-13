import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FixedSizeGrid as Grid } from "react-window";

// ================= DEBOUNCE =================
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
};

// ================= OBJECT STRUCTURES (TEMPLATE STYLE) =================
const createInfo = (id, i, brands, categories) => ({
  id: `info-${id}`,
  name: `${brands[i % brands.length]} Product ${id}`,
  category: categories[i % categories.length],
  brand: brands[i % brands.length],
});

const createPricing = (id, base) => ({
  id: `pricing-${id}`,
  base,
  discount: Math.random() > 0.5 ? 10 : 0,
  final: base * 0.9,
  currency: "USD",
});

const createInventory = (id, i) => ({
  id: `inventory-${id}`,
  stock: Math.floor(Math.random() * 100),
  warehouse: `WH-${i % 20}`,
});

const createSeller = (id, i) => ({
  id: `seller-${id}`,
  name: `Seller-${i % 200}`,
  rating: Math.random() * 5,
  verified: Math.random() > 0.5,
});

const createAI = (id) => ({
  id: `ai-${id}`,
  score: Math.random() * 100,
  trending: Math.random() * 50,
  popularity: Math.random() * 200,
});

const createShipping = (id) => ({
  id: `shipping-${id}`,
  free: Math.random() > 0.5,
  days: Math.floor(Math.random() * 7) + 1,
});

// ================= ARRAY STRUCTURES =================
const createTags = (id, i) => ({
  id: `tags-${id}`,
  list: ["new", "sale", "hot", "trending", "featured"].slice(
    0,
    (i % 5) + 1
  ),
});

const createColors = (id, colors, i) => ({
  id: `colors-${id}`,
  list: colors.slice(0, (i % colors.length) + 1),
});

const createImages = (id) => ({
  id: `images-${id}`,
  list: [
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/201",
    "https://via.placeholder.com/202",
  ],
});

const createReviews = (id) => ({
  id: `reviews-${id}`,
  list: Array.from({ length: 5 }, (_, r) => ({
    id: `${id}-review-${r}`,
    user: `User-${r}`,
    rating: Math.floor(Math.random() * 5) + 1,
    comment: "Good product",
  })),
});

// ================= MASSIVE GENERATOR =================
const generateProducts = (size = 30000000) => {
  const categories = ["Mobile", "Laptop", "Fashion", "Electronics"];
  const brands = ["Apple", "Samsung", "Dell", "HP", "Nike", "Sony"];
  const colors = ["Black", "White", "Blue", "Red", "Green"];

  return Array.from({ length: size }, (_, i) => {
    const id = i + 1;
    const basePrice = Math.floor(Math.random() * 100000 + 500);

    return {
      id,

      // ================= OBJECT GROUP =================
      info: createInfo(id, i, brands, categories),
      pricing: createPricing(id, basePrice),
      inventory: createInventory(id, i),
      seller: createSeller(id, i),
      ai: createAI(id),
      shipping: createShipping(id),

      // ================= ARRAY GROUP =================
      tags: createTags(id, i),
      colors: createColors(id, colors, i),
      images: createImages(id),
      reviews: createReviews(id),
    };
  });
};

// ================= API =================
const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateProducts(25000));
    }, 500);
  });
};

// ================= CARD =================
const ProductCard = ({ product }) => {
  return (
    <div className="border p-3 m-2 rounded shadow bg-white">
      <img src={product.images.list[0]} alt="" />

      <h3 className="font-bold text-sm">
        {product.info.name}
      </h3>

      <p>ID: {product.id}</p>
      <p>Brand: {product.info.brand}</p>
      <p>Category: {product.info.category}</p>

      <p>৳ ${product.pricing.final.toFixed(0)}</p>
      <p>⭐ {product.seller.rating.toFixed(1)}</p>

      <p>
        {product.inventory.stock > 0
          ? "In Stock"
          : "Out"}
      </p>

      {/* ARRAY: tags */}
      <div className="flex gap-1 flex-wrap text-xs mt-1">
        {product.tags.list.map((t) => (
          <span key={t} className="bg-gray-200 px-1">
            {t}
          </span>
        ))}
      </div>

      {/* ARRAY: colors */}
      <div className="flex gap-1 text-xs mt-1">
        {product.colors.list.map((c) => (
          <span key={c} className="text-blue-500">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

// ================= GRID =================
const ProductGrid = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "ALL",
    price: 0,
    rating: 0,
  });

  const debouncedSearch = useDebounce(filters.search);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // ================= FILTER ENGINE =================
  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.category !== "ALL") {
      result = result.filter(
        (p) => p.info.category === filters.category
      );
    }

    if (filters.price > 0) {
      result = result.filter(
        (p) => p.pricing.final >= filters.price
      );
    }

    if (filters.rating > 0) {
      result = result.filter(
        (p) => p.seller.rating >= filters.rating
      );
    }

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      result = result.filter((p) =>
        p.info.name.toLowerCase().includes(s)
      );
    }

    return result;
  }, [products, filters, debouncedSearch]);

  // ================= VIRTUAL GRID =================
  const COLUMN = 4;
  const HEIGHT = 600;
  const WIDTH = 1000;
  const ROW_HEIGHT = 260;

  const rowCount = Math.ceil(filtered.length / COLUMN);

  const Cell = ({ rowIndex, columnIndex, style }) => {
    const index = rowIndex * COLUMN + columnIndex;
    const product = filtered[index];

    if (!product) return null;

    return (
      <div style={style}>
        <ProductCard product={product} />
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">

      {/* FILTER BAR */}
      <div className="flex gap-2 flex-wrap mb-4">
        <input
          placeholder="Search"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              search: e.target.value,
            }))
          }
        />

        <select
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              category: e.target.value,
            }))
          }
        >
          <option value="ALL">All</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              price: Number(e.target.value),
            }))
          }
        />

        <input
          type="number"
          placeholder="Min Rating"
          onChange={(e) =>
            setFilters((f) => ({
              ...f,
              rating: Number(e.target.value),
            }))
          }
        />
      </div>

      {/* GRID */}
      <Grid
        columnCount={COLUMN}
        columnWidth={250}
        height={HEIGHT}
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        width={WIDTH}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default ProductGrid;