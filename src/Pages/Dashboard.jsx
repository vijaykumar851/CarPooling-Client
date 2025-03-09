import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/1'); // Replace with the correct endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Logic for logout
  };

  const handleChangePassword = () => {
    // Logic for changing password
  };

  const handleViewProfile = () => {
    // Logic for viewing profile
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <div>
          <h2>Welcome, {userData.firstName} {userData.lastName}</h2>
          <p>Email: {userData.email}</p>
          <p>Mobile Number: {userData.mobileNumber}</p>
          <p>Role: {userData.role}</p>
          {userData.role === 'driver' && (
            <p>Number Plate: {userData.numberPlate}</p>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleChangePassword}>Change Password</button>
      <button onClick={handleViewProfile}>View Profile</button>
    </div>
  );
}

export default Dashboard;