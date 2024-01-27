import React, { useState, useEffect } from 'react';
import './ChangePassword.scss';
import logo from '../../images/rootlogo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';
import newRequest from '../../utils/newRequest.js';
import go from '../../images/letsgo.gif';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function ChangePassword() {
  const location = useLocation();
  const resetToken = location.pathname.split('/').pop();
  useEffect(() => {
    document.title = 'Update Password';
  }, []);

  const [formData, setFormData] = useState({
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    try {
      const { newPassword } = formData;

      if (!validatePassword(newPassword)) {
        setError('Password must be at least 8 characters long');
        return;
      }
      setLoading(true);
      const response = await newRequest.post(`/auth/change-password`, {
        newPassword,
        resetToken, // Include resetToken in the request body
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      setSuccess('Password updated successfully');
      console.log (resetToken);
      
    } catch (error) {
      setError('Internal server error');
    } finally {
      setLoading(false);
    }
  };
  const handleSignIn = () => {
    // Redirect to the login page
    navigate('/sign-in');
  };
  return (
    <div className='sign-in'>
      <Link className='home-logo' to='/'>
        <img src={logo} className='logo-1' alt='logo' />
      </Link>
      <div className='sign-in-container2'>
        <div className='sign-in-header'>New Password</div>
        <p className='send-reset-text'>Enter your new password below to reset your password</p>

        {error && <div className='error-box'>{error}</div>}

        <div className='sign-in-box'>
          <label className='sign-in-text'>Input password</label>
          <input
            className='sign-in-input'
            placeholder='Password'
            name='newPassword'
            type='password'
            onChange={handleChange}
          />
        </div>
        {success && <div className='success-box'>{success}</div>}
        
         <img className='email-sent' src={go} alt='Email Sent' />

        {success ? (
        <div className='button3' onClick={handleSignIn}>
           {loading ? <CircleLoader color={'#36D7B7'} css={override} size={20} /> : 'Login in to your account'}
        </div>
      ) : (
        <div className='button3' onClick={handleLogin}>
          {loading ? <CircleLoader color={'#36D7B7'} css={override} size={20} /> : 'Update Password'}
        </div>
      )}
      </div>
    </div>
  );
}

export default ChangePassword;
