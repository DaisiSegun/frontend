import React, { useEffect } from 'react';
import './Products.scss';
import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { css } from "@emotion/react";
import aiDance from '../../images/dance.gif'
import load from '../../images/load.gif'
import Sorry2 from '../../components/sorry/Sorry2';
import ProductCard from '../../components/productCard/ProductCard';
import './Products.scss'
import NavBar from '../../components/navBar/NavBar';

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Use 100vh to make it full height */
`;

function Products() {
  useEffect(() => {
    document.title = 'Products';
  }, []);

  // Get the category from the URL using location.pathname
  const category = decodeURIComponent(useLocation().pathname.split('/')[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => newRequest('/products/all').then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className='loader'>
        
        <div className='load-page'>
        <p className='load-text'>Loading <img className='load-gif' src={load} alt='Loading..'/>  please kindly wait..</p>
        <img className='dance-gif' src={aiDance} alt='Loading...' />
        
        </div>
        <NavBar/>
      </div>
    );
  }


  if (error) {
    return <div>network errror, refresh page</div>;
  }

  // Ensure data is defined before trying to filter
  const filteredData = data ? data.filter((product) => product.cat === category) : [];

  return (
    <div className='products'>
      <Header showSearch={true} />
      <h1 className='product-header-24px'>{category}</h1>
      <p className='product-subtitle-text'>Find African made items</p>

      <div className='product-cards'>
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))
        ) : (
          null
        )}
      </div>
      
     
     
      {filteredData.length === 0 && <Sorry2 />}


    <NavBar/>
    </div>
  );
}

export default Products;
