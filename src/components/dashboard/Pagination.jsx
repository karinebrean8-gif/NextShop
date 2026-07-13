import React from "react";

const Pagination = ({ current, total, onChange }) => {
  const pages = [];

  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 p-4">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border ${current === p ? "bg-blue-600 text-white" : ""
            }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;