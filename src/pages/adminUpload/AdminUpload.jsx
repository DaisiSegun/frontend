import React, { useState } from 'react';
import './AdminUpload.scss';
import upload from '../../utils/upload.js';



import newRequest from '../../utils/newRequest.js';
import { CircleLoader } from 'react-spinners';
import Header from '../../components/header/Header.jsx';
import NavBar from '../../components/navBar/NavBar.jsx';
import getCurrentUser from '../../utils/getCurrentUser';
import { useNavigate } from 'react-router-dom';

function AdminUpload() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    desc: '',
    image: null,
    id: '', // Add an 'id' field
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);
      const url = await upload(formData.image);
      console.log('Cloudinary URL:', url);

      const response = await newRequest.post('/cat/create', {
        ...formData,
        imageUrl: url,
      });

      setSuccessMessage('Category created successfully');
      setError('');
      // You can access the new category id from the response if your server returns it
      console.log('New Category ID:', response.data.catId);
    } catch (error) {
      console.error('Upload failed:', error);

      setError(error.response?.data?.error || 'Upload failed');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };
  if (!currentUser || !currentUser.user.isAdmin) {
    // Redirect to a different page if the user is not an admin
    navigate('/');
    return null; // Render nothing while redirecting
  }

  return (
    <div className='sign-in'>
   

      <Header/>

      <div className='sign-in-container'>
        <div className='sign-in-header'>Create Service Category</div>
        <p className='sign-up-now'>Add Categories</p>

        <div className='sign-in-box'>
          <label className='sign-in-text'>ID</label>
          <input
            className='sign-in-input'
            placeholder='id'
            name='id'
            onChange={handleChange}
          />
        </div>
        <div className='sign-in-box'>
          <label className='sign-in-text'>Title</label>
          <input
            className='sign-in-input'
            placeholder='Title'
            name='title'
            onChange={handleChange}
          />
        </div>

        <div className='sign-in-box'>
          <label className='sign-in-text'>Category</label>
          <input
            type='email'
            className='sign-in-input'
            placeholder='category'
            name='category'
            onChange={handleChange}
          />
        </div>

        <div className='sign-in-box'>
          <label className='sign-in-text'>Descriptions</label>
          <input
            className='sign-in-input'
            placeholder='Descrition'
            name='desc'
            onChange={handleChange}
          />
        </div>

        <div className='create-contianer3'>
          <p className='create-title3'>Image</p>
          <input
            type='file'
            accept='image/*'
            className='sign-in-input'
            name='image'
            onChange={handleImageChange}
          />
        </div>

        {error && <div className='error-box'>{error}</div>}
        {successMessage && <div className='success-box'>{successMessage}</div>}

        <div className='button3' onClick={handleRegistration}>
          {loading ? (
            <CircleLoader color='#ffffff' size={20} />
          ) : (
            'Create'
          )}
        </div>
      </div>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/>
    </div>
  );
}

export default AdminUpload;
