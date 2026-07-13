/**
 * =========================================================
 * 🧠 ULTRA FAANG CART ITEM (SINGLE FILE)
 * Staff / Principal Engineer Level Design
 * =========================================================
 */

import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "./CartSlice";

/**
 * =========================================================
 * 🔒 CONSTANTS (OBJECT DRIVEN CONFIG)
 * =========================================================
 */

const CONFIG = {
  MAX_QTY: 99,
  MIN_QTY: 1,
  NETWORK_DELAY: 350,
};

const ACTIONS = {
  INC: "INC",
  DEC: "DEC",
  REMOVE: "REMOVE",
};

/**
 * =========================================================
 * 🌐 PROMISE LAYER (REAL-WORLD NETWORK SIMULATION)
 * =========================================================
 */

const simulateApi = (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        payload,
        timestamp: Date.now(),
      });
    }, CONFIG.NETWORK_DELAY);
  });
};

/**
 * =========================================================
 * 🧠 BUSINESS ENGINE (ARRAY + LOOP + IF-ELSE HEAVY)
 * =========================================================
 */

const computeItemMetrics = (qty, price) => {
  let result = {
    total: 0,
    level: "low",
    valid: true,
  };

  if (!qty || qty <= 0) {
    result.valid = false;
    return result;
  }

  result.total = qty * price;

  const rules = [
    { min: 1, level: "low" },
    { min: 5, level: "medium" },
    { min: 10, level: "high" },
    { min: 20, level: "vip" },
  ];

  for (let i = 0; i < rules.length; i++) {
    if (qty >= rules[i].min) {
      result.level = rules[i].level;
    }
  }

  return result;
};

/**
 * =========================================================
 * 🎨 COMPONENT
 * =========================================================
 */

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  /**
   * =========================================================
   * ⚡ ACTION ENGINE (PROMISE + IF-ELSE CONTROL FLOW)
   * =========================================================
   */

  const handleAction = async (type) => {
    setLoading(true);

    let newQty = qty;

    if (type === ACTIONS.INC) {
      if (qty < CONFIG.MAX_QTY) {
        newQty = qty + 1;
      }
    } else if (type === ACTIONS.DEC) {
      if (qty > CONFIG.MIN_QTY) {
        newQty = qty - 1;
      }
    } else if (type === ACTIONS.REMOVE) {
      newQty = 0;
    }

    // simulate backend sync (real-world pattern)
    await simulateApi({ id: item.id, qty: newQty });

    if (newQty === 0) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQty }));
    }

    setQty(newQty);
    setLoading(false);
  };

  /**
   * =========================================================
   * 🧠 DERIVED STATE (MEMOIZED ENGINE)
   * =========================================================
   */

  const computed = useMemo(() => {
    return computeItemMetrics(qty, item.price);
  }, [qty, item.price]);

  /**
   * =========================================================
   * 🎨 DYNAMIC STYLE ENGINE
   * =========================================================
   */

  const badgeColor = (() => {
    if (computed.level === "vip") return "bg-purple-600";
    if (computed.level === "high") return "bg-red-500";
    if (computed.level === "medium") return "bg-yellow-500";
    return "bg-green-500";
  })();

  /**
   * =========================================================
   * 🎨 UI
   * =========================================================
   */

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl shadow-md mb-3 hover:shadow-xl transition-all">

      {/* LEFT SIDE */}
      <div>
        <h2 className="font-bold text-lg">{item.name}</h2>

        <p className="text-gray-300 text-sm">
          ৳{item.price} × {qty}
        </p>

        <p className="text-gray-400 text-sm">
          Total: ৳{computed.total}
        </p>

        {/* LEVEL BADGE */}
        <span
          className={`inline-block mt-1 text-xs px-2 py-1 rounded text-white ${badgeColor}`}
        >
          {computed.level.toUpperCase()}
        </span>
      </div>

      {/* RIGHT SIDE CONTROLS */}
      <div className="flex items-center gap-2">

        {/* DECREASE */}
        <button
          disabled={loading}
          onClick={() => handleAction(ACTIONS.DEC)}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          -
        </button>

        {/* QTY */}
        <span className="w-8 text-center">{qty}</span>

        {/* INCREASE */}
        <button
          disabled={loading}
          onClick={() => handleAction(ACTIONS.INC)}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          +
        </button>

        {/* REMOVE */}
        <button
          disabled={loading}
          onClick={() => handleAction(ACTIONS.REMOVE)}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;