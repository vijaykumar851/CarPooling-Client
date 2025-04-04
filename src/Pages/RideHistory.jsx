import React from "react";
import "./RideHistory.css";

const RideHistory = () => {
  const sampleRideHistory = [
    {
      id: "ride1",
      from: "warangal",
      to: "Secunderabad",
      date: "2025-04-01",
      time: "09:00 AM",
      status: "completed",
      rating: 4.5,
    },
    {
      id: "ride2",
      from: "Hyderabad",
      to: "Medak",
      date: "2025-04-02",
      time: "02:00 PM",
      status: "completed",
      rating: 4.8,
    },
    {
      id: "ride3",
      from: "Hyderabad",
      to: "Bangalore",
      date: "2025-04-03",
      time: "11:30 AM",
      status: "cancelled",
      rating: null,
    },
   
  ];

  return (
    <div className="ride-history-container">
      <h1 className="ride-title">Ride History</h1>
      {sampleRideHistory.length > 0 ? (
        sampleRideHistory.map((ride) => (
          <div key={ride.id} className="ride-card">
            <div className="ride-info">
              <p>
                <strong>From:</strong> {ride.from} <strong>To:</strong> {ride.to}
              </p>
              <p>
                <strong>Date:</strong> {ride.date} <strong>Time:</strong> {ride.time}
              </p>
              <p className="status">
                <strong>Status:</strong> {ride.status}
              </p>
            </div>
            {ride.rating && (
              <div className="rating">Rating :
                ⭐ {ride.rating}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No ride history available.</p>
      )}
    </div>
  );
};

export default RideHistory;
