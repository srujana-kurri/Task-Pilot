import React, { useState } from 'react';
import './SignUpForm.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    // Validate username
    if (!name.trim()) {
      errors.name = 'Username is required';
    }

    // Validate email
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = 'Invalid email address';
    }

    // Validate password
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password =
        'Password must be at least 6 characters long with one capital letter and one special character';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    try {
      console.log("Inside try block");
      const response = await axios.post('http://localhost:4000/signup', {
        name,
        email,
        password,
      });
      console.log("After axios request");
      console.log(response.data);
      if (response.data === 'Added') {
        console.log("User added successfully!");
        setRegistrationMessage('User added successfully!');
        history('/Login');
      }
    } catch (error) {
      console.error("Error during axios request:", error);
      setRegistrationMessage('Error while registering');
    }
  };
  

  return (
    <div className="container">
      <div className="signup-form">
        <div className="form-group-up text-center">
          <h2 className="heading">Sign Up</h2>
        </div>
        {registrationMessage && (
          <div className={`alert ${registrationMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {registrationMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="title-label" htmlFor="username">
              <i className="fa-solid fa-user"></i>User name
            </label>
            <input
              type="text"
              id="username"
              className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {validationErrors.name && (
              <div className="invalid-feedback">{validationErrors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label className="title-label" htmlFor="email">
              <i className="fa-solid fa-envelope"></i>Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label className="title-label" htmlFor="password">
              <i className="fa-solid fa-key"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {validationErrors.password && (
              <div className="invalid-feedback">{validationErrors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-block" >
            Sign Up
          </button>
        </form>
        <div className="form-group-up text-center login-link ">
          Already a member? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
