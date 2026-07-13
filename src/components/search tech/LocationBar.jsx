import React, {
  useEffect,
  useState,
} from "react";

import React, { useState } from "react";

const LocationBar = ({ onLocationChange }) => {
  const [location, setLocation] = useState("");

  const locations = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Khulna",
    "Rajshahi",
  ];

  const handleSelect = (value) => {
    setLocation(value);

    let isValid = false;

    for (const loc of locations) {
      if (loc === value) {
        isValid = true;
      }
    }

    if (isValid) {
      onLocationChange(value);
    }
  };

  return (
    <div className="p-3 bg-white shadow mt-2">
      <select
        className="w-full border p-2"
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option>Select Location</option>

        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchLocation = () => {
    setLoading(true);

    fetch("/api/location/current")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Location fetch failed"
          );
        }

        return res.json();
      })
      .then((data) => {
        setLocation(
          data.city || "Dhaka"
        );
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="location-bar">
      📍

      {loading && (
        <span>Loading...</span>
      )}

      {!loading && (
        <span>
          Deliver to {location}
        </span>
      )}

      {error && (
        <small>{error}</small>
      )}
    </div>
  );
};



export default LocationBar;