/**
 * =========================================================
 * 🧠 ULTRA FAANG CART SYSTEM (ALL-IN-ONE FILE)
 * =========================================================
 */

import React from "react";
import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

/**
 * =========================================================
 * 🔒 CONSTANTS
 * =========================================================
 */

const TAX_RATE = 0.1;

const SHIPPING_RULES = [
    { min: 0, max: 500, fee: 60 },
    { min: 500, max: 2000, fee: 30 },
    { min: 2000, max: Infinity, fee: 0 },
];

/**
 * =========================================================
 * ⚙️ ENTITY ADAPTER (O(1))
 * =========================================================
 */

const adapter = createEntityAdapter({
    selectId: (item) => item.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

/**
 * =========================================================
 * 🧠 UTIL FUNCTIONS (OBJECT + ARRAY + LOOP + IF-ELSE)
 * =========================================================
 */

const calculateShipping = (subtotal) => {
    for (let i = 0; i < SHIPPING_RULES.length; i++) {
        const rule = SHIPPING_RULES[i];

        if (subtotal >= rule.min && subtotal < rule.max) {
            return rule.fee;
        }
    }
    return 0;
};

const calculatePricing = (entities) => {
    let subtotal = 0;
    let totalItems = 0;

    const items = Object.values(entities);

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (!item || typeof item.price !== "number") continue;

        subtotal += item.price * item.quantity;
        totalItems += item.quantity;
    }

    const shipping = calculateShipping(subtotal);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + shipping;

    return {
        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        shipping,
        total: Number(total.toFixed(2)),
        totalItems,
    };
};

/**
 * =========================================================
 * 🌐 PROMISE UTIL (RETRY LOGIC)
 * =========================================================
 */

const fetchWithRetry = async (url, options = {}, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, options);

            if (!res.ok) throw new Error("API error");

            return await res.json();
        } catch (err) {
            if (i === retries - 1) throw err;
        }
    }
};

/**
 * =========================================================
 * 🌐 ASYNC THUNKS
 * =========================================================
 */

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchWithRetry("/api/cart");
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const syncCart = createAsyncThunk(
    "cart/syncCart",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const items = Object.values(state.cart.entities);

            return await fetchWithRetry("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(items),
            });
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

/**
 * =========================================================
 * 🧾 INITIAL STATE
 * =========================================================
 */

const initialState = adapter.getInitialState({
    pricing: {
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        totalItems: 0,
    },
    meta: {
        status: "idle",
        error: null,
        lastSync: null,
    },
    ui: {
        isOpen: false,
    },
});

/**
 * =========================================================
 * 🏪 SLICE
 * =========================================================
 */

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addItem: (state, action) => {
            const item = action.payload;

            if (!item || !item.id) return;

            const existing = state.entities[item.id];

            if (existing) {
                existing.quantity += 1;
            } else {
                adapter.addOne(state, { ...item, quantity: 1 });
            }

            state.pricing = calculatePricing(state.entities);
        },

        removeItem: (state, action) => {
            const id = action.payload;

            if (!state.entities[id]) return;

            adapter.removeOne(state, id);

            state.pricing = calculatePricing(state.entities);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            if (!state.entities[id]) return;

            if (quantity <= 0) {
                adapter.removeOne(state, id);
            } else {
                state.entities[id].quantity = quantity;
            }

            state.pricing = calculatePricing(state.entities);
        },

        clearCart: (state) => {
            adapter.removeAll(state);
            state.pricing = calculatePricing({});
        },

        toggleCart: (state) => {
            state.ui.isOpen = !state.ui.isOpen;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.meta.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.meta.status = "success";

                adapter.setAll(state, action.payload);

                state.pricing = calculatePricing(state.entities);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.meta.status = "error";
                state.meta.error = action.payload;
            })
            .addCase(syncCart.fulfilled, (state) => {
                state.meta.lastSync = Date.now();
            });
    },
});

/**
 * =========================================================
 * 📤 ACTIONS
 * =========================================================
 */

export const {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
} = cartSlice.actions;

/**
 * =========================================================
 * 🧮 SELECTORS
 * =========================================================
 */

const selectors = adapter.getSelectors((state) => state.cart);

export const selectItems = selectors.selectAll;

export const selectPricing = (state) => state.cart.pricing;

export const selectTotal = createSelector(
    selectPricing,
    (p) => p.total
);

export const selectCount = createSelector(
    selectPricing,
    (p) => p.totalItems
);

export const selectCartOpen = (state) => state.cart.ui.isOpen;

/**
 * =========================================================
 * 🎨 UI COMPONENT (TAILWIND)
 * =========================================================
 */

export const CartUI = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const isOpen = useSelector(selectCartOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-0 w-96 h-full bg-gray-900 text-white p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>

            {items.length === 0 ? (
                <p className="text-gray-400">Empty cart</p>
            ) : (
                items.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between bg-gray-800 p-3 mb-3 rounded-lg"
                    >
                        <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-gray-400">
                                {item.quantity} × ৳{item.price}
                            </p>
                        </div>

                        <button
                            onClick={() => dispatch(removeItem(item.id))}
                            className="bg-red-500 px-2 py-1 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}

            <h3 className="mt-4 font-bold">Total: ৳{total}</h3>

            <button
                onClick={() => dispatch(clearCart())}
                className="mt-3 w-full bg-yellow-500 text-black py-2 rounded"
            >
                Clear Cart
            </button>
        </div>
    );
};

/**
 * =========================================================
 * 🏁 EXPORT REDUCER
 * =========================================================
 */

export default cartSlice.reducer;