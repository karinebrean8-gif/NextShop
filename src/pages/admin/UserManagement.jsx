import React, {
  useEffect,
  useState,
  useMemo
} from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () =>
    new Promise((resolve) => {
      resolve([
        {
          id: 1,
          name: "Admin User",
          role: "Admin"
        },
        {
          id: 2,
          name: "Seller User",
          role: "Seller"
        },
        {
          id: 3,
          name: "Customer User",
          role: "Customer"
        }
      ]);
    });

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    loadUsers();
  }, []);

  const roleSummary = useMemo(() => {
    const summary = {};

    for (const user of users) {
      if (summary[user.role]) {
        summary[user.role]++;
      } else {
        summary[user.role] = 1;
      }
    }

    return summary;
  }, [users]);

  const changeRole = (id) => {
    const updated = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          role:
            user.role === "Seller"
              ? "Admin"
              : "Seller"
        };
      }

      return user;
    });

    setUsers(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        User Management
      </h1>

      <div className="mb-6">
        {Object.entries(roleSummary).map(
          ([role, count]) => (
            <div key={role}>
              {role}: {count}
            </div>
          )
        )}
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow p-4 rounded"
          >
            <h3>{user.name}</h3>

            <p>
              Role:
              {user.role}
            </p>

            <button
              onClick={() =>
                changeRole(
                  user.id
                )
              }
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Change Role
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;