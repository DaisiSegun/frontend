import React, { useEffect } from 'react';
import './Sps.scss';
import SpCard from '../../components/spCard/SpCard';
import Footer from '../../components/footer/Footer';
import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Sorry from '../../components/sorry/Sorry';

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Use 100vh to make it full height */
`;

function Sps() {
  useEffect(() => {
    document.title = 'Service Providers';
  }, []);

  // Get the category from the URL using location.pathname
  const category = decodeURIComponent(useLocation().pathname.split('/')[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['services'],
    queryFn: () => newRequest('/services/all').then((res) => res.data),
  });

  if (isLoading) {
    return <ClipLoader color={"#36D7B7"} css={override} size={150} />;
  }

  if (error) {
    return <div>network errror, refresh page</div>;
  }

  // Ensure data is defined before trying to filter
  const filteredData = data ? data.filter((service) => service.cat === category) : [];

  return (
    <div className='sps'>
      <Header showSearch={true} />
      <h1 className='header-24px'>{category}</h1>
      <p className='subtitle-text'>Each service provider personally selected and approved by Root</p>

      {filteredData.length > 0 ? (
        filteredData.map((service) => (
          <SpCard key={service._id} item={service} />
        ))
      ) : (
       
        <Sorry/>
      )}

      <Footer />
    </div>
  );
}

export default Sps;
