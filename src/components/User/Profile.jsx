import React, { useEffect, useState, useMemo } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: "Shakib Mia",
          email: "shakib@example.com",
          role: "Seller",
          addresses: [
            "Dhaka Warehouse",
            "Khulna Store",
            "Barisal Hub"
          ]
        });
      }, 1200);
    });
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchProfile();

        if (response) {
          setProfile(response);
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const totalAddresses = useMemo(() => {
    if (!profile) return 0;
    return profile.addresses.length;
  }, [profile]);

  if (loading) return <h2>Loading Profile...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Profile</h1>

      <h3>{profile.name}</h3>
      <p>{profile.email}</p>
      <p>{profile.role}</p>

      <h4>Total Addresses: {totalAddresses}</h4>

      <ul>
        {profile.addresses.map((address, index) => (
          <li key={index}>{address}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;