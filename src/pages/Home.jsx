import { useEffect, useState, useMemo } from "react";
import axios from "axios";

// UI Components (assumed existing)
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Error from "../components/Error";
import Sidebar from "../components/Sidebar";
import Deals from "../components/Deals";
import Trending from "../components/Trending";
import Footer from "../components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProducts = () => {
      setLoading(true);
      setError("");

      axios
        .get("/api/products", { cancelToken: source.token })
        .then((res) => {
          const data = res?.data || [];
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          setError(err.response?.data?.message || "Failed to load products");
          setLoading(false);
        });
    };

    fetchProducts();

    return () => {
      source.cancel("Component unmounted");
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [products, query, category]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between p-3 gap-4">
          <h1 className="text-xl font-bold text-blue-600">NextShop</h1>

          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <div className="hidden md:block">
            <Sidebar onCategoryChange={setCategory} />
          </div>
        </div>
      </div>

      {/* Hero */}
      <Banner />

      {/* Sections */}
      <Deals />
      <Trending />

      {/* Content */}
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {category === "all" ? "All Products" : category}
          </h2>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} items
          </span>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
          </div>
        )}

        {/* Error */}
        {error && <Error message={error} />}

        {/* Products */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
