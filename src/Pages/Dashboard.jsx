import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserData(user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRides = async () => {
      try {
        const response = await fetch('http://localhost:3000/rides');
        const data = await response.json();
        setRides(data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchUserData();
    fetchRides();
  }, [navigate]);

  const handlePostRide = () => {
    navigate('/post-ride');
  };

  const handleSearchRides = () => {
    navigate('/search-rides');
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {userData && (
        <div>
          <h2>Welcome, {userData.username}</h2>
          <p>Email: {userData.email}</p>
          <p>Mobile Number: {userData.mobileNumber}</p>
          <p>Role: {userData.role}</p>
          {userData.role === 'driver' && (
            <div>
              <button onClick={handlePostRide}>Post a Ride</button>
              <h3>Your Posted Rides</h3>
              {rides.filter(ride => ride.driverId === userData.id).map(ride => (
                <div key={ride.id}>
                  <p>Location: {ride.location}</p>
                  <p>Time: {ride.time}</p>
                  <p>Seats: {ride.seats}</p>
                </div>
              ))}
            </div>
          )}
          {userData.role === 'rider' && (
            <div>
              <button onClick={handleSearchRides}>Search for Rides</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;