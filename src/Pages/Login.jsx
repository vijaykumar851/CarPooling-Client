import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Index from './Index';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      alert('Please enter username and password.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users?username=${formData.username}&password=${formData.password}`);
      const users = await response.json();

      if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        setIsLoggedIn(true);
        alert('Login successful!');
        navigate('/Index'); // Redirect to Dashboard
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    alert('Logged out successfully!');
  };

  return (
    <div className="home-container">
      <div className="login-container">
        <h1>{isLoggedIn ? 'Welcome! my Home page' : 'Login'}</h1>

        {!isLoggedIn ? (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Login;