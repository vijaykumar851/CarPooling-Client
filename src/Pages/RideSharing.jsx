import React from 'react';
import { useRideContext } from "../Context/RideContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import './RideSharing.css';

const RideSharing = () => {
  const { rides } = useRideContext(); // Access rides from context
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleBookNow = (ride) => {
    // Redirect to the payment page with the selected ride's details
    navigate('/payment', { state: { ride } });
  };

  return (
    <div className="ride-sharing-container">
      <h1>Available Rides</h1>
      {rides.length > 0 ? (
        rides.map((ride, index) => (
          <div key={index} className="ride-card">
            <div className="ride-details">
              {/* Driver Image and Name */}
              <div className="driver-info">
                {ride.driverImage && (
                  <img
                    src={ride.driverImage}
                    alt="Driver"
                    className="driver-image"
                  />
                )}
                <p className="driver-name">
                  <strong>Driver:</strong> {ride.driverName || "N/A"}
                </p>
              </div>
              {/* Ride Details */}
              <p>
                <strong>From:</strong> {ride.from} <strong>To:</strong> {ride.to}
              </p>
              <p>
                <strong>Date:</strong> {ride.date} <strong>Time:</strong> {ride.time}
              </p>
              <p>
                <strong>Seats:</strong> {ride.seats} <strong>Price:</strong> ₹{ride.price}
              </p>
              <p>
                <strong>Preferences:</strong>{' '}
                {ride.preferences.smoking && '🚬 Smoking '}
                {ride.preferences.pets && '🐾 Pets '}
                {ride.preferences.music && '🎵 Music '}
                {ride.preferences.luggage && '🧳 Luggage'}
              </p>
            </div>
            {/* Separate Book Now Button Section */}
            <div className="book-now-section">
              <button
                className="book-now-button"
                onClick={() => handleBookNow(ride)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No rides available.</p>
      )}
    </div>
  );
};

export default RideSharing;