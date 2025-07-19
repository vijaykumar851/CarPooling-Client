// Payment.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [amount, setAmount] = useState("0");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const state = location.state;
    if (state?.ride && state?.amount) {
      setRide(state.ride);
      setAmount(state.amount);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleDummyPayment = () => {
    setTimeout(() => {
      setSuccess(true);
      const history = JSON.parse(localStorage.getItem('rideHistory')) || [];
      history.push({ ...ride, amount, paidAt: new Date().toISOString() });
      localStorage.setItem('rideHistory', JSON.stringify(history));

      setTimeout(() => {
        navigate('/ride-history');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      {ride && (
        <div className="summary">
          <p><strong>Driver:</strong> {ride.driverName}</p>
          {ride.driverImage && (
            <img src={ride.driverImage} alt="Driver" className="driver-image" />
          )}
          <p><strong>From:</strong> {ride.from}</p>
          <p><strong>To:</strong> {ride.to}</p>
          <p><strong>Date:</strong> {ride.date}</p>
          <p><strong>Amount:</strong> ₹{amount}</p>
        </div>
      )}
      <button onClick={handleDummyPayment}>Pay ₹{amount}</button>
      {success && <p style={{ color: "green" }}>Payment Successful! Redirecting...</p>}
    </div>
  );
};

export default Payment;
