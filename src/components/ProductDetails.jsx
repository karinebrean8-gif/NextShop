import { useEffect, useState } from "react";
import { getProduct } from "../../services/api";

const ProductDetails = ({ productId, onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAdd = async () => {
    await new Promise((res) => setTimeout(res, 300));
    onAddToCart({ ...product, qty });
  };

  if (loading) return <p className="p-4">Loading product...</p>;
  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      {/* IMAGE */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.noodles}
          className="h-80 object-contain"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>

        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-green-600 text-xl font-bold mt-3">
          ${product.price}
        </p>

        {/* QUANTITY CONTROL */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border"
          >
            -
          </button>

          <span>{qty}</span>

          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-1 border"
          >
            +
          </button>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAdd}
          className="mt-5 bg-black text-white px-6 py-2 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;