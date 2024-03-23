import React, { useEffect, useState } from 'react';
import './ProductResult.scss';


import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';

import Sorry2 from '../../components/sorry/Sorry2';

import load from '../../images/load.gif'
import NavBar from '../../components/navBar/NavBar';
import ProductCard from '../../components/productCard/ProductCard';


function ProductResult() {
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
        const response = await newRequest.get(`/products/all?search=${search}`);
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
      <p className='subtitle-text'>Find an African made product</p>
      <div style={{ marginTop: '1rem' }}></div>


      {data.length === 0 &&  <Sorry2 />} 

      <div className='pro-card'>

       {/* Display services with matching titles first */}
    {data
      .filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
      )
      .map((service) => (
        <ProductCard key={service._id} item={service} />
      ))}
    
    {/* Display remaining services */}
    {data
      .filter((service) =>
        !service.title.toLowerCase().includes(search.toLowerCase())
      )
      .map((service) => (
        <ProductCard key={service._id} item={service} />
      ))}

    </div>

    <div style={{ marginBottom: '6rem' }}></div>
     <NavBar/>
    </div>
  );
}

export default ProductResult;