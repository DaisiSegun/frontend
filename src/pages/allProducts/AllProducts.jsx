import React, { useEffect } from 'react';
import './AllProducts.scss';
import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useQuery } from '@tanstack/react-query';


import getCurrentUser from '../../utils/getCurrentUser';
import { useNavigate } from 'react-router-dom';
import Sorry2 from '../../components/sorry/Sorry2';
import ProductCard from '../../components/productCard/ProductCard';

import NavBar from '../../components/navBar/NavBar';


function AllProducts() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'All Products';
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => newRequest('/products/all').then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className='loader'>
        <Header/>
        <p>Loading...</p>
        <NavBar/>
      </div>
    );
  }

  if (error) {
    return <div>Network error, please refresh the page</div>;
  }

  if (!currentUser || !currentUser.user.isAdmin) {
    // Redirect to a different page if the user is not an admin
    navigate('/');
    return null; // Render nothing while redirecting
  }
  
  return (
    <div className='products'>
      <Header showSearch={true} />
      <h1 className='product-header-24px'>All Products ({data.length}) </h1>
      <p className='product-subtitle-text'>Total number of products: {data.length}</p>

      <div className='product-cards'>
        {data && data.map((product) => (
          <ProductCard key={product._id} item={product} />
        ))}
      </div>
      
      {data && data.length === 0 && <Sorry2 />}

      <div style={{ marginBottom: '6rem' }}></div>
      <NavBar/>
    </div>
  );
}

export default AllProducts;
