import React, { useEffect } from 'react';
import './AllServices.scss';
import SpCard from '../../components/spCard/SpCard';

import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useQuery } from '@tanstack/react-query';


import Sorry from '../../components/sorry/Sorry';
import NavBar from '../navBar/NavBar';
import getCurrentUser from '../../utils/getCurrentUser';
import { useNavigate } from 'react-router-dom';



function AllServices() {
  useEffect(() => {
    document.title = 'Service Providers';
  }, []);

  const currentUser = getCurrentUser();
  const navigate = useNavigate();





  const { isLoading, error, data } = useQuery({
    queryKey: ['services'],
    queryFn: () => newRequest('/services/all').then((res) => res.data),
  });

  if (isLoading) {
    return <p> <Header showSearch={true} />Loading...</p>;
  }

  if (error) {
    return <div>Network error, refresh page</div>;
  }

  // Ensure data is defined before rendering
  const services = data || [];

  if (!currentUser || !currentUser.user.isAdmin) {
    // Redirect to a different page if the user is not an admin
    navigate('/');
    return null; // Render nothing while redirecting
  }

  return (
    <div className='sps'>
      <Header showSearch={true} />
      <h1 className='header-24px'>All Services(<strong>{services.length}</strong>)</h1>
      <p className='subtitle-text'>Total Number of Services: <strong>{services.length}</strong></p>

      {services.length > 0 ? (
        services.map((service, index) => (
          <SpCard key={service._id} item={service} index={index + 1} />
        ))
      ) : (
        <Sorry />
      )}
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/>
    </div>
  );
}

export default AllServices;
