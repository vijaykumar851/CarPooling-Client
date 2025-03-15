import React, { useState } from 'react'; // Import the combined CSS file

const Index = () => {
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    alert(`Searching for rides to: ${destination}`);
  };

  return (
    <div className="index-page">
      <section className="hero-section">
        <h1>Ride Together, Save Together</h1>
        <p>Find your perfect carpool match and save money on your commute.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter your destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={handleSearch}>Search Rides</button>
        </div>
      </section>

      <section className="features-section">
        <div className="feature">
          <h2>🚗 Easy Ridesharing</h2>
          <p>Connect with drivers or passengers going your way.</p>
        </div>
        <div className="feature">
          <h2>💰 Save Money</h2>
          <p>Split costs and reduce your travel expenses.</p>
        </div>
        <div className="feature">
          <h2>🌍 Eco-Friendly</h2>
          <p>Reduce your carbon footprint by sharing rides.</p>
        </div>
      </section>
    </div>
  );
};

export default Index;