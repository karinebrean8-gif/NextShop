import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    await new Promise((res) => setTimeout(res, 800));
    console.log("User Registered:", form);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleRegister}
        className="bg-black text-white w-full py-2"
      >
        Register
      </button>
    </div>
  );
};

export default Register;