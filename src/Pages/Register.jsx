import React, { useState } from 'react'

function Register() {
  return (
    <>
      <div className="home2-container">
        <div className="login-container">
          <h1>Register</h1>
          <input type="text" required placeholder='Username' />
          <input type="text" required placeholder='Email' />
          <input type="text" required placeholder='Mobile Number' />
          <input type="password" required placeholder='Create password' />
          <input type="password" required placeholder='Re-Enter Password' />
          <select id="role">
            <option value="rider">Rider</option>
            <option value="driver">Driver</option>
          </select>
          <button type="submit">Submit</button>
        </div>
      </div>
    </>
  );
}

export default Register;