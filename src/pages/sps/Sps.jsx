import React, { useEffect } from 'react';
import './Sps.scss';
import SpCard from '../../components/spCard/SpCard';
import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Sorry from '../../components/sorry/Sorry';
import load from '../../images/load.gif';
import NavBar from '../../components/navBar/NavBar';


function Sps() {
  useEffect(() => {
    document.title = 'Service Providers';
  }, []);

  const category = decodeURIComponent(useLocation().pathname.split('/')[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['services'],
    queryFn: () => newRequest(`/services/all`).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className='loader'>
        <div className='load-page'>
          <p className='load-text'>Loading... <img className='load-gif' src={load} alt='Loading..' /> please kindly wait..</p>
        </div>
        <NavBar />
      </div>
    );
  }

  if (error) {
    return <div>network error, refresh page</div>;
  }

  const filteredData = data ? data.filter((service) => service.cat === category) : [];

  return (
    <div className='sps'>
      <Header showSearch={true} />
      <h1 className='header-24px'>{category}</h1>
      <p className='subtitle-text'>Each seller personally selected and approved by Root</p>

      {filteredData.length > 0 ? (
        filteredData.map((service) => <SpCard key={service._id} item={service} />)
      ) : (
        <Sorry />
      )}
      <div style={{ marginBottom: '4rem' }}></div>
      <NavBar />
    </div>
  );
}

export default Sps;
