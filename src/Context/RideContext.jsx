import React, { createContext, useState, useContext } from 'react';

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [rides, setRides] = useState([]); // State for available rides
  const [rideHistory, setRideHistory] = useState([]); // State for ride history
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Function to add a new ride
  const addRide = (ride) => {
    setRides((prevRides) => [...prevRides, ride]);
  };

  // Function to fetch ride history for a user
  const fetchRideHistory = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/rides/history?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch ride history");
      }
      const data = await response.json();
      setRideHistory(data);
    } catch (error) {
      console.error("Error fetching ride history:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to submit a rating and review for a ride
  const submitRating = async (rideId, rating, review) => {
    setError(null);
    try {
      const response = await fetch(`/rides/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rideId, rating, review }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError(error.message);
    }
  };

  return (
    <RideContext.Provider
      value={{
        rides,
        addRide,
        rideHistory,
        fetchRideHistory,
        submitRating,
        loading,
        error,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => useContext(RideContext);