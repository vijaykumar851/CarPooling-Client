import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Import CSS for styling

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

  return (
    <div className="navBar">
      <p>CarP🚗🚘L</p>
      <ul className="list-items">
        <NavLink className='item2' to="/"><li>Home</li></NavLink>
        <li>About</li>
        {user ? (
          <>
            <NavLink className='item2' to="/dashboard"><li>Dashboard</li></NavLink>
            <div className="profile-container">
              <img
                src="/path/to/profile-image.png" // Replace with the path to your profile image
                alt="Profile"
                className="profile-image"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <p>{user.username}</p>
                  <button onClick={handleProfileClick}>Edit Profile</button>
                  <button onClick={handleLogout}>Logout</button>
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