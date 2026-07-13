import React, {
  useEffect,
  useMemo,
  useState
} from "react";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [showUnread, setShowUnread] = useState(false);

  const fetchNotifications = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "New Order Received",
            read: false
          },
          {
            id: 2,
            title: "Payment Successful",
            read: true
          },
          {
            id: 3,
            title: "Stock Running Low",
            read: false
          },
          {
            id: 4,
            title: "Product Approved",
            read: true
          }
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
    };

    loadNotifications();
  }, []);

  const unreadCount = useMemo(() => {
    let count = 0;

    for (const item of notifications) {
      if (!item.read) {
        count++;
      }
    }

    return count;
  }, [notifications]);

  const displayedNotifications = useMemo(() => {
    if (showUnread) {
      return notifications.filter(
        item => !item.read
      );
    }

    return notifications;
  }, [notifications, showUnread]);

  const markAsRead = (id) => {
    const updated = notifications.map(item => {
      if (item.id === id) {
        return {
          ...item,
          read: true
        };
      }

      return item;
    });

    setNotifications(updated);
  };

  return (
    <div>
      <h1>Notification Center</h1>

      <h3>
        Unread Notifications: {unreadCount}
      </h3>

      <button
        onClick={() =>
          setShowUnread(!showUnread)
        }
      >
        {showUnread
          ? "Show All"
          : "Show Unread"}
      </button>

      <hr />

      {displayedNotifications.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h4>{item.title}</h4>

          <p>
            {item.read
              ? "Read"
              : "Unread"}
          </p>

          {!item.read && (
            <button
              onClick={() =>
                markAsRead(item.id)
              }
            >
              Mark Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;