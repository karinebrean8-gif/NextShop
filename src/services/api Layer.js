const API_BASE = "https://fakestoreapi.com";

// generic fetch wrapper (senior pattern)
const request = async (url, options = {}) => {
  try {
    const res = await fetch(API_BASE + url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) throw new Error("API Error");
    return await res.json();
  } catch (err) {
    console.error("Request Failed:", err);
    throw err;
  }
};

// PROMISE-BASED exports
export const getProducts = () => request("/products");
export const getProduct = (id) => request(`/products/${id}`);
export const loginUser = (data) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });