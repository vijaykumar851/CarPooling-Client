import React, { useState } from 'react';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    role: 'rider',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    if (step === 1 && !formData.username) {
      alert('Error: Please enter a username!');
      return false;
    }
    if (step === 2 && (!formData.email || !formData.mobileNumber)) {
      alert('Error: Please enter both email and mobile number!');
      return false;
    }
    if (step === 3 && (!formData.password || !formData.confirmPassword)) {
      alert('Error: Please enter and confirm your password!');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const checkExistingUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users`);
      const users = await response.json();
      return users.some(
        (user) =>
          user.username === formData.username ||
          user.email === formData.email ||
          user.mobileNumber === formData.mobileNumber
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert('Error: Please select a role!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Error: Passwords do not match!');
      return;
    }

    const userExists = await checkExistingUser();
    if (userExists) {
      alert('Error: Username, email, or mobile number already exists!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful!');
        setFormData({
          username: '',
          email: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
          role: 'rider',
        });
        setStep(1);
      } else {
        alert('Error: Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: Something went wrong, please try again later.');
    }
  };

  return (
    <div className="home2-container">
      <div className="login-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input type="text" name="username" required placeholder="Username" value={formData.username} onChange={handleChange} />
              <br /><br />
              <button type="button" onClick={nextStep}>Next</button>
            </>
          )}
          {step === 2 && (
            <>
              <input type="email" name="email" required placeholder="Email" value={formData.email} onChange={handleChange} />
              <br /><br />
              <input type="tel" name="mobileNumber" required placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
              <br /><br />
              <button type="button" onClick={prevStep}>Back</button>
              <span style={{ margin: '0 10px' }}></span>
              <button type="button" onClick={nextStep}>Next</button>
            </>
          )}
          {step === 3 && (
            <>
              <input type="password" name="password" required placeholder="Create password" value={formData.password} onChange={handleChange} />
              <br /><br />
              <input type="password" name="confirmPassword" required placeholder="Re-Enter Password" value={formData.confirmPassword} onChange={handleChange} />
              <br /><br />
              <button type="button" onClick={prevStep}>Back</button>
              <span style={{ margin: '0 10px' }}></span>
              <button type="button" onClick={nextStep}>Next</button>
            </>
          )}
          {step === 4 && (
            <>
              <select id="role" name="role" value={formData.role} onChange={handleChange} style={{ width: '100%' }}>
                <option value="rider">Rider</option>
                <option value="driver">Driver</option>
              </select>
              <br /><br />
              <button type="button" onClick={prevStep}>Back</button>
              <span style={{ margin: '0 10px' }}></span>
              <button type="submit">Submit</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
