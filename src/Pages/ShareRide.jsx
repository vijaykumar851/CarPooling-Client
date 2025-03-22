import React from 'react';
import './ShareRide.css'; // Import a CSS file for styling

const ShareRide = () => {
  // Predefined array of default rides
  const defaultRides = [
    {
      id: 1,
      driverName: 'Venkat Kumar',
      from: 'Hyderabad',
      to: 'Vijayawada',
      price: 800,
      seatsAvailable: 3,
    },
    {
      id: 2,
      driverName: 'Suresh Reddy',
      from: 'Secunderabad',
      to: 'Warangal',
      price: 500,
      seatsAvailable: 2,
    },
    {
      id: 3,
      driverName: 'yashwanth',
      from: 'Bangalore',
      to: 'Chennai',
      price: 1000,
      seatsAvailable: 4,
    },
    {
      id: 4,
      driverName: 'Ravi',
      from: 'Hyderabad',
      to: 'Chennai',
      price: 1100,
      seatsAvailable: 3,
    },
  ];

  const handleBooking = (rideId) => {
    alert(`Booking ride with ID: ${rideId}`);
    // Implement booking logic here
  };

  return (
    <div className="share-ride-container">
      <h1>Share a Ride</h1>
      <div className="rides-list">
        {defaultRides.map((ride) => (
          <div key={ride.id} className="ride-box">
            <h3>{ride.driverName}</h3>
            <p><strong>From:</strong> {ride.from}</p>
            <p><strong>To:</strong> {ride.to}</p>
            <p><strong>Price:</strong> ₹{ride.price}</p>
            <p><strong>Seats Available:</strong> {ride.seatsAvailable}</p>
            <button onClick={() => handleBooking(ride.id)} className="book-button">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareRide;