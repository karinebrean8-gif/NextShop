/**
 * =========================================================
 * 🧠 ULTRA FAANG PRODUCT SYSTEM (PRINCIPAL ENGINEER LEVEL)
 * Single File | Highly Scalable | Data-Driven Architecture
 * =========================================================
 */

import React, { useEffect, useMemo, useReducer, useRef } from "react";

/**
 * =========================================================
 * 🔒 CONSTANTS (OBJECT HEAVY)
 * =========================================================
 */

const CONFIG = {
  API_URL: "/api/products",
  MAX_RETRY: 3,
  TIMEOUT: 5000,
  PAGINATION_LIMIT: 8,
};

const SORT = {
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
  NAME_ASC: "NAME_ASC",
  NAME_DESC: "NAME_DESC",
};

const FILTER_DEFAULT = {
  search: "",
  min: 0,
  max: Infinity,
  sort: SORT.NAME_ASC,
};

/**
 * =========================================================
 * ⚙️ PROMISE UTILS (RETRY + TIMEOUT)
 * =========================================================
 */

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const fetchWithControl = (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    let lastError;

    for (let i = 0; i < CONFIG.MAX_RETRY; i++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

      try {
        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        return resolve(data);
      } catch (err) {
        lastError = err;
        await delay(300);
      }
    }

    reject(lastError);
  });
};

/**
 * =========================================================
 * 🧠 CORE ENGINE (ARRAY + LOOP + IF-ELSE EXTREME)
 * =========================================================
 */

const computeProducts = (products, filters) => {
  const output = [];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];

    if (!p || typeof p !== "object") continue;

    // Defensive normalization
    const name = (p.name || "").toLowerCase();
    const price = Number(p.price) || 0;

    // SEARCH FILTER
    if (filters.search) {
      if (!name.includes(filters.search.toLowerCase())) continue;
    }

    // PRICE FILTER
    if (price < filters.min) continue;
    if (price > filters.max) continue;

    // OBJECT TRANSFORMATION
    const enriched = {
      ...p,
      price,
      name,
      tag:
        price > 200000
          ? "premium"
          : price > 100000
            ? "mid"
            : "budget",
    };

    output.push(enriched);
  }

  // SORTING ENGINE
  if (filters.sort === SORT.PRICE_ASC) {
    output.sort((a, b) => a.price - b.price);
  } else if (filters.sort === SORT.PRICE_DESC) {
    output.sort((a, b) => b.price - a.price);
  } else if (filters.sort === SORT.NAME_ASC) {
    output.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === SORT.NAME_DESC) {
    output.sort((a, b) => b.name.localeCompare(a.name));
  }

  return output;
};

/**
 * =========================================================
 * 🧠 REDUCER (STATE MACHINE STYLE)
 * =========================================================
 */

const initialState = {
  products: [],
  status: "idle",
  error: null,
  filters: FILTER_DEFAULT,
  page: 1,
};

const reducer = (state, action) => {
  if (action.type === "FETCH_START") {
    return { ...state, status: "loading" };
  }

  if (action.type === "FETCH_SUCCESS") {
    return {
      ...state,
      status: "success",
      products: action.payload,
    };
  }

  if (action.type === "FETCH_ERROR") {
    return { ...state, status: "error", error: action.payload };
  }

  if (action.type === "SET_FILTER") {
    return {
      ...state,
      filters: { ...state.filters, ...action.payload },
      page: 1,
    };
  }

  if (action.type === "NEXT_PAGE") {
    return { ...state, page: state.page + 1 };
  }

  return state;
};

/**
 * =========================================================
 * 🎨 COMPONENT
 * =========================================================
 */

const ProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mounted = useRef(true);

  /**
   * =========================================================
   * 📡 LOAD DATA (PROMISE)
   * =========================================================
   */

  const loadData = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      let data = [];

      try {
        data = await fetchWithControl(CONFIG.API_URL);
      } catch {
        // FALLBACK DATA (ARRAY HEAVY)
        data = Array.from({ length: 30 }, (_, i) => {
          const price = Math.floor(Math.random() * 300000);

          return {
            id: i + 1,
            name: `Product ${i + 1}`,
            price,
          };
        });
      }

      if (mounted.current) {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      }
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  useEffect(() => {
    loadData();

    return () => {
      mounted.current = false;
    };
  }, []);

  /**
   * =========================================================
   * ⚡ MEMO (HEAVY OPTIMIZATION)
   * =========================================================
   */

  const computed = useMemo(() => {
    return computeProducts(state.products, state.filters);
  }, [state.products, state.filters]);

  /**
   * =========================================================
   * 📄 PAGINATION (LOOP)
   * =========================================================
   */

  const paginated = useMemo(() => {
    const result = [];
    const limit = CONFIG.PAGINATION_LIMIT * state.page;

    for (let i = 0; i < computed.length; i++) {
      if (i >= limit) break;
      result.push(computed[i]);
    }

    return result;
  }, [computed, state.page]);

  /**
   * =========================================================
   * 🎯 HANDLERS
   * =========================================================
   */

  const updateFilter = (obj) => {
    dispatch({ type: "SET_FILTER", payload: obj });
  };

  /**
   * =========================================================
   * 🎨 UI
   * =========================================================
   */

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* FILTER PANEL */}
      <div className="bg-white p-4 rounded-xl shadow flex gap-3 flex-wrap mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Search..."
          onChange={(e) => updateFilter({ search: e.target.value })}
        />

        <input
          type="number"
          placeholder="Min"
          className="border p-2 rounded"
          onChange={(e) =>
            updateFilter({ min: Number(e.target.value) || 0 })
          }
        />

        <input
          type="number"
          placeholder="Max"
          className="border p-2 rounded"
          onChange={(e) =>
            updateFilter({
              max: Number(e.target.value) || Infinity,
            })
          }
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => updateFilter({ sort: e.target.value })}
        >
          {Object.values(SORT).map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* STATUS */}
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && (
        <p className="text-red-500">{state.error}</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-4 gap-4">
        {paginated.map((p) => {
          let badgeColor = "bg-gray-400";

          if (p.tag === "premium") badgeColor = "bg-red-500";
          else if (p.tag === "mid") badgeColor = "bg-yellow-500";
          else badgeColor = "bg-green-500";

          return (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-gray-600">৳{p.price}</p>

              <span
                className={`text-white text-xs px-2 py-1 rounded ${badgeColor}`}
              >
                {p.tag}
              </span>

              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* LOAD MORE */}
      {paginated.length < computed.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => dispatch({ type: "NEXT_PAGE" })}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;