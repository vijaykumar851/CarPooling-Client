import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the Dashboard.css file for styling

const locations = ['Hyderabad', 'Tamilnadu', 'Kerala', 'Bangalore', 'Mumbai', 'Delhi', 'Kolkata', 'Chennai', 'Vijayawada'];

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [rides, setRides] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [filteredFromLocations, setFilteredFromLocations] = useState([]);
  const [filteredToLocations, setFilteredToLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserData(user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRides = async () => {
      try {
        const response = await fetch('https://carpooling-server-vlzw.onrender.com/users');
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchUserData();
    fetchRides();
  }, []);

  const handleSearch = () => {
    if (!userData) {
      alert('Please log in to search for rides.');
      navigate('/login');
      return;
    }

    if (from && to && date && passengerCount) {
      navigate('/ride-sharing', { state: { from, to, date, passengerCount } });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    setFilteredFromLocations(locations.filter((location) => location.toLowerCase().includes(value.toLowerCase())));
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    setFilteredToLocations(locations.filter((location) => location.toLowerCase().includes(value.toLowerCase())));
  };

  const selectFromLocation = (location) => {
    setFrom(location);
    setFilteredFromLocations([]);
  };

  const selectToLocation = (location) => {
    setTo(location);
    setFilteredToLocations([]);
  };

  return (
    <div className="dashboard-container">
      <section className="hero-section">
        <h1>Your pick of rides at low prices</h1>
        <p>Find your perfect carpool match and save money on your commute.</p>
        <div className="search-bar">
          <div className="autocomplete">
            <input
              type="text"
              placeholder="Leaving from"
              value={from}
              onChange={handleFromChange}
            />
            {filteredFromLocations.length > 0 && (
              <ul className="autocomplete-list">
                {filteredFromLocations.map((location, index) => (
                  <li key={index} onClick={() => selectFromLocation(location)}>
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="autocomplete">
            <input
              type="text"
              placeholder="Going to"
              value={to}
              onChange={handleToChange}
            />
            {filteredToLocations.length > 0 && (
              <ul className="autocomplete-list">
                {filteredToLocations.map((location, index) => (
                  <li key={index} onClick={() => selectToLocation(location)}>
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="date"
            placeholder="dd-mm-yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="1"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      <section className="features-section">
        <div className="feature">
          <h2>🚗 Your pick of rides at low prices</h2>
          <p>No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.</p>
        </div>
        <div className="feature">
          <h2>💰 Trust who you travel with</h2>
          <p>We take the time to get to know each of our members and bus partners. We check reviews, profiles and IDs, so you know who you're travelling with and can book your ride at ease on our secure platform.</p>
        </div>
        <div className="feature">
          <h2>🌍 Scroll, click, tap and go!</h2>
          <p>Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes.</p>
        </div>
      </section>

      <section className="savings-section">
        <img src="/dashboard.jpg" alt="Carpooling" />
        <div className="savings-content">
          <h2>Carpooling saves you money</h2>
          <p>Whether you are a car owner, bike owner, or rider, carpooling can help you save up to 80% on your commute.</p>
          <div className="savings-feature">
            <img src="carpool-graphic.png" alt="Car/Bike Owner" />
            <p><strong>Car/Bike Owner:</strong> Save up to 75% on fuel and maintenance costs.</p>
          </div>
          <div className="savings-feature">
            <img src="/carpool-graphic.png" alt="Riders" />
            <p><strong>Riders:</strong> Save up to 75% of your costs compared to cabs.</p>
          </div>
        </div>
      </section>

      <section className="best-routes-section">
        <h2>Our best Travelling Routes</h2>
        <div className="routes-container">
          <div className="route-box">
            <img src="/medak.jpg" alt="Route" />
            <div className="route-box-content">
              <h3>Hyderabad → Medak</h3>
              <p>Costs Ranges 300-500</p>
              <p className="price">...</p>
              <span className="arrow">→</span>
            </div>
          </div>
          <div className="route-box">
            <img src="/warangal.jpeg" alt="Route" />
            <div className="route-box-content">
              <h3>Secunderabad → Warangal</h3>
              <p>Cost Ranges 500-700</p>
              <p className="price">...</p>
              <span className="arrow">→</span>
            </div>
          </div>
          <div className="route-box">
            <img src="/vijayawada.jpg" alt="Route" />
            <div className="route-box-content">
              <h3>Hyderabad → Vijayawada</h3>
              <p>Cost Ranges 800-1000</p>
              <p className="price">...</p>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;