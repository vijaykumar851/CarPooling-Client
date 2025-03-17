import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch(`https://carpooling-server-vlzw.onrender.com/users`);
      const users = await response.json();

      const user = users.find(
        (user) => user.username === formData.username && user.password === formData.password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="home-container">
      <div className="login-container">
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <div>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={toggleShowPassword}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;