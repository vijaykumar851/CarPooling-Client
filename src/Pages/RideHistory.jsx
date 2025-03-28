import React, { useEffect } from "react";
import { useRideContext } from "../Context/RideContext";

const RideHistory = ({ user }) => {
  const { rideHistory, fetchRideHistory, loading, error } = useRideContext();

  useEffect(() => {
    if (user) {
      fetchRideHistory(user.id);
    }
  }, [user, fetchRideHistory]);

  if (loading) {
    return <p>Loading ride history...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Ride History</h1>
      {rideHistory.length > 0 ? (
        rideHistory.map((ride) => (
          <div key={ride.id}>
            <p>
              <strong>From:</strong> {ride.from} <strong>To:</strong> {ride.to}
            </p>
            <p>
              <strong>Date:</strong> {ride.date} <strong>Time:</strong> {ride.time}
            </p>
          </div>
        ))
      ) : (
        <p>No ride history available.</p>
      )}
    </div>
  );
};

export default RideHistory;