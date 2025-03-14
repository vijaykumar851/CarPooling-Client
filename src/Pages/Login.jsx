import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
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
      const response = await fetch(`http://localhost:3000/users?username=${formData.username}&password=${formData.password}`);
      const users = await response.json();

      if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        setUser(users[0]);
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
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;