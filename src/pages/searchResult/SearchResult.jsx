import React, { useEffect, useState } from 'react';
import './SearchResult.scss';


import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import SpCard from '../../components/spCard/SpCard';
import Sorry from '../../components/sorry/Sorry';

import load from '../../images/load.gif'
import NavBar from '../../components/navBar/NavBar';



function SearchResult() {
  useEffect(() => {
    document.title = 'Search Result';
  }, []);

  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true when starting a new request
        const response = await newRequest.get(`/services/all?search=${search}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },[search] );

  if (isLoading) {
    return (
      <div className='loader'>
        <div className='load-page'>
        <p className='load-text'>Loading <img className='load-gif' src={load} alt='Loading..'/>  please kindly wait..</p>
      
        
        </div>
        <NavBar/>
      </div>
    );
  }

  if (error) {
    return <div>Error loading data, Bad network or refresh page</div>;
  }

  return (
    <div className='sps'>
    <Header showSearch={true} />
    <h1 className='header-24px'>Search Result</h1>
    <p className='subtitle-text'>Find African services</p>

    {data.length === 0 && <Sorry />}

    {/* Display services with matching titles first */}
    {data
      .filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
      )
      .map((service) => (
        <SpCard key={service._id} item={service} />
      ))}
    
    {/* Display remaining services */}
    {data
      .filter((service) =>
        !service.title.toLowerCase().includes(search.toLowerCase())
      )
      .map((service) => (
        <SpCard key={service._id} item={service} />
      ))}

    <div className='space25'></div>
    <NavBar />
  </div>
  );
}

export default SearchResult;