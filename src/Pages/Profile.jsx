import React, { useState, useEffect } from 'react';
import '../Profile.css'; // Import the Profile.css file for styling

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    profilePicture: '',
    id: ''
  });

  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      setProfilePreview(user.profilePicture);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, profilePicture: file });
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://carpooling-server-vlzw.onrender.com/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        alert('Error updating profile.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: Something went wrong, please try again later.');
    }
  };

  return (
    <div className="profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="profile-picture-container">
          {profilePreview ? (
            <img src={profilePreview} alt="Profile Preview" className="profile-picture-preview" />
          ) : (
            <div className="profile-picture-placeholder">No Image</div>
          )}
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={userData.mobileNumber}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;