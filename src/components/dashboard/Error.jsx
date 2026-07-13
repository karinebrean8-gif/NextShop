import { useEffect, useState } from "react";

const Error = ({ errorPromise }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!errorPromise) return;

    errorPromise
      .catch((err) => setError(err.message || "Something went wrong"));
  }, [errorPromise]);

  if (!error) return null;

  return (
    <div className="bg-red-100 text-red-700 p-4 rounded">
      ⚠ {error}
    </div>
  );
};

export default Error;