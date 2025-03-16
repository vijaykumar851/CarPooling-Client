import React from 'react';
import { useLocation } from 'react-router-dom';

const RideSharing = () => {
  const location = useLocation();
  const { from, to } = location.state || {};

  return (
    <div className="ride-sharing-container">
      <h1>Available Rides</h1>
      <p>Searching for rides from: {from} to: {to}</p>
      {/* Add your ride-sharing content here */}
    </div>
  );
};

export default RideSharing;