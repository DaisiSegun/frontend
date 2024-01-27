import React, { useState, useEffect } from 'react';
import './ResetEmail.scss';
import logo from '../../images/rootlogo.svg';
import { Link } from 'react-router-dom';

import { css } from "@emotion/react";
import { CircleLoader } from "react-spinners";
import newRequest from "../../utils/newRequest.js";
import email from '../../images/email.gif'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function ResetEmail() {
  useEffect(() => {
    document.title = 'Res';
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await newRequest.post('/auth/forgot-password', formData);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setSuccess('We’ve sent the password reset instructions to your email')
     
    } catch (error) {
   
      setError('Email not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sign-in'>
      <Link className='home-logo' to='/'>
        <img src={logo} className='logo-1' alt='logo' />
      </Link>
      <div className='sign-in-container2'>
        <div className='sign-in-header8'>Forgot your password?</div>
        <p className='send-reset-text1'>No problem! Just enter the email address that you signed up with to reset it.</p>

        {error && <div className='error-box'>{error}</div>}
       

        <div className='sign-in-box'>
   
          <input
            className='sign-in-input'
            placeholder='Email'
            name='email'
            onChange={handleChange}
          />
        </div>
        {success && <div className='success-box'>{success}</div>}
        {success && <img className='email-sent' src={email} alt='Email Sent' />}

        <div className='button3' onClick={handleLogin}>
          {loading ? (
            <CircleLoader color={"#36D7B7"} css={override} size={20} />
          ) : (
            'Send reset instructions'
          )}
        </div>

      
      </div>
    </div>
  );
}

export default ResetEmail;
