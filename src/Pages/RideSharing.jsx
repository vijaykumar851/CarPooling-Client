import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RideSharing.css';

const RideSharing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from = '', to = '', date = '', persons = 1 } = location.state || {};

  const rides = [
    { id: 1, time: '10:20', from: 'Hyderabad', to: 'Bangalore', duration: '8h', price: 500, driver: 'venkat', rating: 4.5 },
    { id: 2, time: '12:00', from: 'Hyderabad', to: 'Chennai', duration: '10h', price: 700, driver: 'ganesh', rating: 4.8 },
    { id: 3, time: '14:30', from: 'Bangalore', to: 'Mumbai', duration: '12h', price: 1000, driver: 'nandini', rating: 4.2 },
    { id: 4, time: '09:00', from: 'Hyderabad', to: 'Bangalore', duration: '7h 30m', price: 450, driver: 'durga', rating: 4.7 },
    { id: 5, time: '11:45', from: 'Hyderabad', to: 'Chennai', duration: '9h 30m', price: 650, driver: 'jaswanth', rating: 4.6 },
    { id: 6, time: '13:15', from: 'Bangalore', to: 'Mumbai', duration: '11h', price: 950, driver: 'sai', rating: 4.3 },
    { id: 7, time: '08:30', from: 'Hyderabad', to: 'Bangalore', duration: '7h', price: 400, driver: 'venkatesh', rating: 4.9 },
    { id: 8, time: '10:00', from: 'Hyderabad', to: 'Chennai', duration: '9h', price: 600, driver: 'khalisi', rating: 4.4 },
    { id: 9, time: '12:30', from: 'Bangalore', to: 'Mumbai', duration: '11h', price: 900, driver: 'srinivas', rating: 4.1 },
    { id: 10, time: '07:00', from: 'Hyderabad', to: 'Bangalore', duration: '6h 30m', price: 500, driver: 'durga', rating: 4.8 },
    { id: 11, time: '09:45', from: 'Hyderabad', to: 'Chennai', duration: '8h 30m', price: 1000, driver: 'prasad', rating: 4.7 },
    { id: 12, time: '11:15', from: 'Bangalore', to: 'Mumbai', duration: '10h', price: 850, driver: 'sai', rating: 4.2 },
    { id: 13, time: '06:30', from: 'Hyderabad', to: 'Bangalore', duration: '6h', price: 350, driver: 'Nayak', rating: 4.9 },
    { id: 14, time: '08:00', from: 'Hyderabad', to: 'Chennai', duration: '8h', price: 550, driver: 'yash', rating: 4.6 },
    { id: 15, time: '10:30', from: 'Bangalore', to: 'Mumbai', duration: '10h', price: 800, driver: 'shiva', rating: 4.3 },
  ];

  const [filteredRides, setFilteredRides] = useState(
    rides.filter(
      (ride) => ride.from.toLowerCase() === from.toLowerCase() && ride.to.toLowerCase() === to.toLowerCase()
    )
  );

  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sortedRides = [...filteredRides];
    if (option === 'price') {
      sortedRides.sort((a, b) => a.price - b.price);
    } else if (option === 'duration') {
      sortedRides.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (option === 'rating') {
      sortedRides.sort((a, b) => b.rating - a.rating);
    }
    setFilteredRides(sortedRides);
  };

  // Handle price range filter
  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
    const filteredByPrice = rides.filter(
      (ride) =>
        ride.from.toLowerCase() === from.toLowerCase() &&
        ride.to.toLowerCase() === to.toLowerCase() &&
        ride.price >= min &&
        ride.price <= max
    );
    setFilteredRides(filteredByPrice);
  };

  // Navigate to Payment Page
  const handleBookNow = (ride) => {
    navigate('/payment', { state: { ride } });
  };

  return (
    <div className="ride-sharing-container">
      <h1>Available Rides</h1>
      <p>
        <strong>From:</strong> {from} <strong>To:</strong> {to} <strong>Date:</strong> {date}{' '}
        <strong>Persons:</strong> {persons}
      </p>

      {/* Filters Section */}
      <div className="filters">
        <div className="sort-filter">
          <label>Sort by:</label>
          <select value={sortOption} onChange={(e) => handleSort(e.target.value)}>
            <option value="">Select</option>
            <option value="price">Price (Low to High)</option>
            <option value="duration">Duration (Short to Long)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>

        <div className="price-filter">
          <label>Price Range:</label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
          />
        </div>
      </div>

      {/* Ride List */}
      {filteredRides.length > 0 ? (
        filteredRides.map((ride) => (
          <div key={ride.id} className="ride-card">
            <p>
              <strong>Time:</strong> {ride.time}
            </p>
            <p>
              <strong>Duration:</strong> {ride.duration}
            </p>
            <p>
              <strong>Price:</strong> ₹{ride.price}
            </p>
            <p>
              <strong>Driver:</strong> {ride.driver} <br /><strong>Rating:</strong> ⭐ {ride.rating}
            </p>
            <button id="booking" onClick={() => handleBookNow(ride)}>Book Now</button>
          </div>
        ))
      ) : (
        <p>No rides available for the selected route.</p>
      )}
    </div>
  );
};

export default RideSharing;