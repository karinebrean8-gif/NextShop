import React, { useEffect, useReducer, useMemo } from "react";

/* =========================================================
   🔥 CORE DATA 
========================================================= */
const CATEGORY_DATA = {
  Fashion: [
    { name: "Men's Shirt", img: "https://source.unsplash.com/300x300/?shirt" },
    { name: "T-shirt", img: "https://source.unsplash.com/300x300/?tshirt" },
    { name: "Jeans", img: "https://source.unsplash.com/300x300/?jeans" },
    { name: "Women's Dress", img: "https://source.unsplash.com/300x300/?dress" },
    { name: "Saree", img: "https://source.unsplash.com/300x300/?saree" },
    { name: "Shoes", img: "https://source.unsplash.com/300x300/?shoes" },
    { name: "Sneakers", img: "https://source.unsplash.com/300x300/?sneakers" },
    { name: "Bags", img: "https://source.unsplash.com/300x300/?bag" },
    { name: "Watches", img: "https://source.unsplash.com/300x300/?watch" },
    { name: "Sunglasses", img: "https://source.unsplash.com/300x300/?sunglasses" },
  ],
  Electronics: [
    { name: "Smartphone", img: "https://source.unsplash.com/300x300/?smartphone" },
    { name: "Laptop", img: "https://source.unsplash.com/300x300/?laptop" },
    { name: "Tablet", img: "https://source.unsplash.com/300x300/?tablet" },
    { name: "Smartwatch", img: "https://source.unsplash.com/300x300/?smartwatch" },
    { name: "Headphones", img: "https://source.unsplash.com/300x300/?headphones" },
    { name: "Camera", img: "https://source.unsplash.com/300x300/?camera" },
    { name: "Speaker", img: "https://source.unsplash.com/300x300/?speaker" },
  ],
  Home: [
    { name: "Sofa", img: "https://source.unsplash.com/300x300/?sofa" },
    { name: "Table", img: "https://source.unsplash.com/300x300/?table" },
    { name: "Bed", img: "https://source.unsplash.com/300x300/?bed" },
    { name: "Kitchen Appliance", img: "https://source.unsplash.com/300x300/?kitchen" },
    { name: "Lighting", img: "https://source.unsplash.com/300x300/?lighting" },
    { name: "Curtains", img: "https://source.unsplash.com/300x300/?curtain" },
    { name: "Storage", img: "https://source.unsplash.com/300x300/?storage" },
  ],
  Grocery: [
    { name: "Fruits", img: "https://source.unsplash.com/300x300/?fruits" },
    { name: "Vegetables", img: "https://source.unsplash.com/300x300/?vegetables" },
    { name: "Snacks", img: "https://source.unsplash.com/300x300/?snacks" },
    { name: "Beverages", img: "https://source.unsplash.com/300x300/?drinks" },
  ],
  Accessories: [
    { name: "Charger", img: "https://source.unsplash.com/300x300/?charger" },
    { name: "Power Bank", img: "https://source.unsplash.com/300x300/?powerbank" },
    { name: "Keyboard", img: "https://source.unsplash.com/300x300/?keyboard" },
    { name: "Mouse", img: "https://source.unsplash.com/300x300/?mouse" },
    { name: "USB Hub", img: "https://source.unsplash.com/300x300/?usb" },
  ],
};

/* =========================================================
   🔥 GLOBAL PRODUCT MODEL (SINGLE SOURCE OF TRUTH)
========================================================= */
const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createProduct = ({ id, name, image, category, index }) => {
  const basePrice = random(100, 2000);

  return {
    id,
    name: `${name} ${index}`,
    image,
    category,

    brand: index % 2 ? "Premium" : "Generic",

    inventory: {
      stock: random(0, 20),
      warehouse: "Tokyo",
    },

    pricing: {
      base: basePrice,
      discount: index % 3 === 0 ? 10 : 0,
      final: basePrice - basePrice * 0.1,
    },

    meta: {
      warranty: `${random(1, 3)} Years`,
      origin: "Japan",
      rating: random(3, 5),
    },

    variants: [
      { id: id + 1000, type: "Standard", price: basePrice },
      { id: id + 2000, type: "Pro", price: basePrice + 200 },
    ],
  };
};

/* =========================================================
   🔥 SERVICE
========================================================= */
const fetchProducts = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      let id = 1;
      const products = [];

      Object.entries(CATEGORY_DATA).forEach(([category, items]) => {
        items.forEach((item) => {
          for (let i = 0; i < 20; i++) {
            products.push(
              createProduct({
                id: id++,
                name: item.name,
                image: item.img,
                category,
                index: i,
              })
            );
          }
        });
      });

      resolve(products);
    }, 800);
  });

/* =========================================================
   🔥 HOOK
========================================================= */
const initialState = {
  products: [],
  loading: true,
  category: "ALL",
  search: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };
    case "CATEGORY":
      return { ...state, category: action.payload };
    case "SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
}

const useProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchProducts().then((data) =>
      dispatch({ type: "SET_PRODUCTS", payload: data })
    );
  }, []);

  const filtered = useMemo(() => {
    let data = [...state.products];

    if (state.category !== "ALL") {
      data = data.filter((p) => p.category === state.category);
    }

    if (state.search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(state.search.toLowerCase())
      );
    }

    return data;
  }, [state]);

  return { state, dispatch, filtered };
};

/* =========================================================
   🔥 UI HELPERS
========================================================= */
const stockColor = (stock) => {
  if (stock === 0) return "red";
  if (stock < 5) return "orange";
  return "green";
};

/* =========================================================
   🔥 COMPONENTS
========================================================= */
const ProductCard = ({ p }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: 10 }}>
      <img src={p.image} style={{ width: "100%", height: 150 }} />

      <h3>{p.name}</h3>
      <p>{p.category}</p>

      <p style={{ color: stockColor(p.inventory.stock) }}>
        {p.inventory.stock === 0 ? "Out" : `Stock: ${p.inventory.stock}`}
      </p>

      <h4>${p.pricing.final}</h4>

      {p.variants.map((v) => (
        <p key={v.id}>
          {v.type} - ${v.price}
        </p>
      ))}

      {p.pricing.final > 1000 ? (
        <p>💎 Premium</p>
      ) : (
        <p>🛒 Budget</p>
      )}
    </div>
  );
};

const Filters = ({ dispatch }) => (
  <div>
    <input
      placeholder="Search"
      onChange={(e) =>
        dispatch({ type: "SEARCH", payload: e.target.value })
      }
    />

    <button onClick={() => dispatch({ type: "CATEGORY", payload: "ALL" })}>
      All
    </button>

    {Object.keys(CATEGORY_DATA).map((c) => (
      <button
        key={c}
        onClick={() => dispatch({ type: "CATEGORY", payload: c })}
      >
        {c}
      </button>
    ))}
  </div>
);

const ProductGrid = ({ products }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
    {products.map((p) => (
      <ProductCard key={p.id} p={p} />
    ))}
  </div>
);

/* =========================================================
   🔥 MAIN
========================================================= */
export default function App() {
  const { state, dispatch, filtered } = useProducts();

  if (state.loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>🔥 Ultra God MAANG Shop</h1>
      <Filters dispatch={dispatch} />
      <ProductGrid products={filtered} />
    </div>
  );
}