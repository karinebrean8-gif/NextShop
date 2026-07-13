import React, { useState, useEffect } from "react";

const AppShell = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const fetchUserData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: "Shakib",
          role: "Seller"
        });
      }, 1000);
    });
  };

  useEffect(() => {
    async function initializeApp() {
      try {
        const data = await fetchUserData();

        if (data) {
          setUser(data);
        } else {
          console.log("User not found");
        }

        setNotifications([
          "New Order",
          "Payment Received",
          "Low Stock Alert"
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    initializeApp();
  }, []);

  if (loading) {
    return <h2>Loading App...</h2>;
  }

  return (
    <div>
      <header>
        <h1>E-Commerce Dashboard</h1>
        <h3>Welcome {user?.name}</h3>
      </header>

      <aside>
        <ul>
          {notifications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </aside>

      <main>
        <h2>Dashboard Content</h2>
      </main>
    </div>
  );
};

export default AppShell;