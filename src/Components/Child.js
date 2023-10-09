import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Child() {

    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const handleFormSwitch = () => {
      setIsRegistering((prevIsRegistering) => !prevIsRegistering);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (isRegistering) {
          // Register user with formData
          const response = await axios.post('http://localhost:3001/api/users/register', formData);
          console.log('Registration successful:', response.data);
        } else {
          // Login user with formData
          const response = await axios.post('http://localhost:3001/api/users/login', formData);
          console.log('Login successful:', response.data);
          localStorage.setItem("token",response.data.token);
          window.location.href="/home"
        }
        // Reset form fields
        setFormData({
          username: '',
          email: '',
          password: '',
        });
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div className="form-group">
            <label htmlFor="username">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegistering
          ? 'Already have an account?'
          : 'Don\'t have an account yet?'}
        <button onClick={handleFormSwitch}>
          {isRegistering ? 'Login here' : 'Register here'}
        </button>
      </p>
    </div>
  )
}

export default Child