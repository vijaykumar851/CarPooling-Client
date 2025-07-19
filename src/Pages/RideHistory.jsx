import React, { useEffect, useState } from 'react';
import './RideHistory.css';

const RideHistory = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('rideHistory')) || [];
    setRides(history);
  }, []);

  // Function to determine status
  const getStatus = (rideDate) => {
    const today = new Date();
    const ride = new Date(rideDate);

    today.setHours(0, 0, 0, 0);
    ride.setHours(0, 0, 0, 0);

    if (ride.getTime() === today.getTime()) return 'Ongoing';
    if (ride < today) return 'Completed';
    if (ride > today) return 'Upcoming';
    return 'Cancelled';
  };

  // Remove duplicates visually (optional safe-guard)
  const uniqueRides = Array.from(
    new Map(rides.map(ride => [`${ride.from}-${ride.to}-${ride.date}-${ride.amount}`, ride])).values()
  );

  return (
    <div className="ride-history-container">
      <h2 className="ride-title">Your Ride History</h2>
      {uniqueRides.length ? (
        uniqueRides.map((ride, idx) => {
          const status = getStatus(ride.date);
          return (
            <div key={idx} className="ride-history-card">
              <p><strong>From:</strong> {ride.from} <strong>To:</strong> {ride.to}</p>
              <p><strong>Date:</strong> {ride.date}</p>
              <p><strong>Amount Paid:</strong> ₹{ride.amount}</p>
              <p className={`status ${status.toLowerCase()}`}>
                <strong>Status:</strong> {status}
              </p>
            </div>
          );
        })
      ) : (
        <p>No rides booked yet.</p>
      )}
    </div>
  );
};

export default RideHistory;
