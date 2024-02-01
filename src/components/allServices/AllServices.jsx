import React, { useEffect } from 'react';
import './AllServices.scss';
import SpCard from '../../components/spCard/SpCard';

import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useQuery } from '@tanstack/react-query';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Sorry from '../../components/sorry/Sorry';

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Use 100vh to make it full height */
`;

function AllServices() {
  useEffect(() => {
    document.title = 'Service Providers';
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['services'],
    queryFn: () => newRequest('/services/all').then((res) => res.data),
  });

  if (isLoading) {
    return <ClipLoader color={"#36D7B7"} css={override} size={150} />;
  }

  if (error) {
    return <div>Network error, refresh page</div>;
  }

  // Ensure data is defined before rendering
  const services = data || [];

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
    </div>
  );
}

export default AllServices;
