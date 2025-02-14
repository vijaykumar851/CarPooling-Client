import React from 'react'

function Login() {
  return (
    <>
      <div className="home-container">
        <div className="login-container">
          <h1>Login</h1>
          <input type="text" placeholder='Username' />
          <input type="password" placeholder='Password' />
          <button>Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;