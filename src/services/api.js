const API = {
  getProducts: async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
  }
};

export default API;