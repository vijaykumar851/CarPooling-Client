import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import './ShareRide.css';

const ShareRide = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    passengers: "",
    date: "", // Add date to formData
  });

  const [places] = useState([/* List of places */]);
  const [filteredFromPlaces, setFilteredFromPlaces] = useState([]);
  const [filteredToPlaces, setFilteredToPlaces] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    }
  }, [user]);

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, source: value });
    setFilteredFromPlaces(
      value ? places.filter(place => place.toLowerCase().startsWith(value.toLowerCase())) : []
    );
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, destination: value });
    setFilteredToPlaces(
      value ? places.filter(place => place.toLowerCase().startsWith(value.toLowerCase())) : []
    );
  };

  const handlePlaceClick = (place, type) => {
    if (type === 'from') {
      setFormData({ ...formData, source: place });
      setFilteredFromPlaces([]);
    } else {
      setFormData({ ...formData, destination: place });
      setFilteredToPlaces([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      navigate('/ride-sharing');
      return;
    }

    const selectedDate = new Date(formData.date);
    const currentDate = new Date();

    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      alert("Please select a current or future date.");
      return;
    }

    navigate('/ride-sharing', { state: { from: formData.source, to: formData.destination, date: formData.date, passengers: formData.passengers } });
  };

  return (
    <div className="share-ride-container">
      <div className="share-ride-card">
        <h2 className="title"> Share the ride with Joy </h2>
        <form onSubmit={handleSubmit} className="share-ride-form">
          <div className="input-container">
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleFromChange}
              placeholder="Leaving from"
              className="input-field"
              required
            />
            {filteredFromPlaces.length > 0 && (
              <ul className="suggestions">
                {filteredFromPlaces.map((place, index) => (
                  <li key={index} onClick={() => handlePlaceClick(place, 'from')}>
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleToChange}
              placeholder="Going to"
              className="input-field"
              required
            />
            {filteredToPlaces.length > 0 && (
              <ul className="suggestions">
                {filteredToPlaces.map((place, index) => (
                  <li key={index} onClick={() => handlePlaceClick(place, 'to')}>
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="date"
            name="date"
            value={formData.date}
            min={new Date().toISOString().split('T')[0]} // Set minimum date to today
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="Date"
            className="input-field"
            required
          />

          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
            placeholder="Passengers"
            className="input-field"
            required
          />

          
          

          <button type="submit" className="submit-button">Search</button>
        </form>
      </div>
    </div>
  );
};

ShareRide.propTypes = {
  user: PropTypes.object
};

export default ShareRide;