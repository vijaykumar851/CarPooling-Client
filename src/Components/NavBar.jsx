import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css'; // CSS styling

function NavBar({ user, setUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleChangePasswordClick = () => {
    navigate('/change-password');
  };

  return (
    <div className="navBar">
      <p>CarP🚗🚘L</p>
      <ul className="list-items">
        <NavLink className='item2' to="/dashboard"><li>Dashboard</li></NavLink>
        {user ? (
          <>
            <NavLink className='item2' to="/share-ride"><li>Share a Ride</li></NavLink>
            <NavLink className='item2' to="/ride-history"><li>Ride History</li></NavLink>
            <div className="profile-container">
              <img
                src="image.png" // Replace with the path to your profile image
                alt="Profile"
                className="profile-image"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <p>{user.username}</p>
                  <button className="dropB" onClick={handleProfileClick}>Edit Profile</button>
                  <button className="dropB" onClick={handleChangePasswordClick}>Change Password</button>
                  <button className="dropB" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink className='item1' to="/login"><li>Login</li></NavLink>
            <NavLink className='item3' to="/register"><li>Register</li></NavLink>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;