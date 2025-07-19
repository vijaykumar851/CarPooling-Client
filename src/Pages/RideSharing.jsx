import React, { useState, useEffect } from 'react';
import { useRideContext } from "../Context/RideContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import './RideSharing.css';

const RideSharing = () => {
  const { rides } = useRideContext(); // Access rides from context
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [userData, setUserData] = useState(null); // Store logged-in user data

  useEffect(() => {
    // Fetch logged-in user data
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserData(user);
        } else {
          navigate('/login'); // Redirect to login if no user is logged in
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleBookNow = (ride) => {
    if (!userData) {
      alert('Please log in to book a ride.');
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }
    navigate('/payment', { state: { ride, amount: ride.price } }); // Redirect to payment page with ride details
  };

  // Function to format time with AM/PM
  const formatTimeWithPeriod = (time, period) => {
    const [hours, minutes] = time.split(':').map(Number);
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
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
                <strong>Date:</strong> {ride.date} <strong>Time:</strong> {formatTimeWithPeriod(ride.time, ride.period || 'AM')}
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
            
            {userData?.role === 'rider' && (
              <div className="book-now-section">
                <button
                  className="book-now-button"
                  onClick={() => handleBookNow(ride)}
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No rides available.</p>
      )}
    </div>
  );
};

export default RideSharing;