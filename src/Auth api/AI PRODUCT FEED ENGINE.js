import { useEffect, useState } from "react";
import { api } from "../api/client";

const AIProductFeed = () => {
  const [items, setItems] = useState([]);

  const loadFeed = () => {
    return api.get("/api/ai/recommendations/")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error loading feed:", err));
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default AIProductFeed;

