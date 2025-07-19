import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('Error: New passwords do not match!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      alert('Error: User not logged in!');
      return;
    }

    try {
      const response = await fetch('https://carpooling-server-vlzw.onrender.com/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        alert('Password changed successfully!');

        // Optional: Remove password from localStorage
        const updatedUser = { ...user };
        delete updatedUser.password;
        localStorage.setItem('user', JSON.stringify(updatedUser));

        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: Something went wrong, please try again later.');
    }
  };

  return (
    <div className="home2-container">
      <div className="login-container">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="currentPassword"
            required
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <br /><br />
          <input
            type="password"
            name="newPassword"
            required
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            minLength="8"
          />
          <br /><br />
          <input
            type="password"
            name="confirmNewPassword"
            required
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            minLength="8"
          />
          <br /><br />
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
