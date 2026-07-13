import { useEffect, useState } from "react";

const Loader = ({ promise }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!promise) {
      setLoading(false);
      return;
    }

    promise
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [promise]);

  if (!loading) return null;

  return (
    <div className="flex justify-center items-center p-6">
      <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"></div>
    </div>
  );
};

export default Loader;