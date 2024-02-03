import React, { useState, useEffect } from 'react';
import './EditProfile.scss'; 
import logo from '../../images/rootlogo.svg';
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import { CircleLoader } from "react-spinners";
import newRequest from "../../utils/newRequest.js";
import getCurrentUser from '../../utils/getCurrentUser.js';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function EditProfile() {
  useEffect(() => {
    document.title = 'Edit Profile';
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    newPassword: '',
    // confirmPassword: '',
    currentPassword: '', // Added currentPassword field
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



  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
  
      // Make sure passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Password and confirm password do not match');
        return;
      }

  
      // Retrieve current user information
      const currentUser = getCurrentUser();
      const userId = currentUser.user._id || currentUser.user.id;
      
      
  
      // Add the user ID to the formData
      const updatedFormData = {
        ...formData,
        userId,
       // Assuming your backend expects the user ID in this format
      };
  
      // Make API call to update profile
      const response = await newRequest.put('/auth/edit-profile', updatedFormData);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setSuccess('Profile updated sucessfully')
      console.log('Profile updated successfully:', response.data);

    } catch (error) {
      console.error('Profile update failed:', error.response.data);
      setError(error.response.data.error || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='sign-in'>
      <Link className='home-logo' to='/'>
        <img src={logo} className='logo-1' alt='logo' />
      </Link>
      <div className='sign-in-container3'>
        <div className='sign-in-header'>Edit Profile</div>
        <p className='sign-up-now'>Edit your profile</p>
       
        <div className='sign-in-box'>
          <label className='sign-in-text'> Change Username</label>
          <input
            type='text'
            className='sign-in-input'
            placeholder='Username'
            name='username'
            onChange={handleChange}
          />
        </div>

        <div className='sign-in-box'>
          <label className='sign-in-text'>Change Email</label>
          <input
            type='email'
            className='sign-in-input'
            placeholder='Email'
            name='email'
            onChange={handleChange}
          />
        </div>

        <div className='sign-in-box'>
          <label className='sign-in-text'>Change Phone Number</label>
          <input
            type='tel'
            className='sign-in-input'
            placeholder='Phone number'
            name='phone'
            onChange={handleChange}
          />
        </div>

        <div className='sign-in-box'>
          <label className='sign-in-text'>Current Password</label>
          <input
            type='password'
            className='sign-in-input'
            placeholder='Current Password'
            name='currentPassword'
            onChange={handleChange}
          />
        </div>

        <div className='sign-in-box'>
          <label className='sign-in-text'>Change Password</label>
          <input
            type='password'
            className='sign-in-input'
            placeholder='Password'
            name='newPassword'
            onChange={handleChange}
          />
        </div>

        {/* <div className='sign-in-box'>
          <label className='sign-in-text'>Confirm change Password</label>
          <input
            type='password'
            className='sign-in-input'
            placeholder='Confirm Password'
            name='confirmNewPassword'
            onChange={handleChange}
          />
        </div> */}

        {error && <div className='error-box'>{error}</div>}
        {success && <div className='success-box'>{success}</div>}

        <div className='button3' onClick={handleUpdateProfile}>
          {loading ? (
            <CircleLoader color={"#36D7B7"} css={override} size={20} />
          ) : (
            'Save Changes'
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
