import React from 'react';
import { useLocation } from 'react-router-dom';

const RideSharing = () => {
  const location = useLocation();
  const { from, to, date, persons } = location.state || {};

  return (
    <div className="ride-sharing-container">
      <h1>Available Rides</h1>
      {from && to ? (
        <div className="ride-details">
          <p><strong>From:</strong> {from}</p>
          <p><strong>To:</strong> {to}</p>
          {date && <p><strong>Date:</strong> {date}</p>}
          {persons && <p><strong>Number of Persons:</strong> {persons}</p>}
        </div>
      ) : (
        <p>Please provide ride details to search for available rides.</p>
      )}
    </div>
  );
};

export default RideSharing; 