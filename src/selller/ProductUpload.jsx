import { useState } from "react";

const ProductUpload = ({ onUpload }) => {
  const [form, setForm] = useState({ title: "", price: "" });

  const handleUpload = async () => {
    await new Promise((res) => setTimeout(res, 700));
    onUpload(form);
  };

  return (
    <div className="p-4 max-w-md">
      <input
        placeholder="Title"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Price"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={handleUpload} className="bg-black text-white w-full">
        Upload
      </button>
    </div>
  );
};

export default ProductUpload;