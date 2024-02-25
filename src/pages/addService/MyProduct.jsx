import React, { useState, useEffect } from 'react';

import './AddService.scss';
import Header from '../../components/header/Header';
import golf from '../../images/golf.svg';

import getCurrentUser from '../../utils/getCurrentUser';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import EditIcon from '@mui/icons-material/Edit';




function MyProduct() {
  useEffect(() => {
    document.title = 'My Product';
  }, []);
  const currentUser = getCurrentUser();
  const [products, setProducts] = useState([]);
  const [reviewsData, setReviewsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/products/all?userId=${currentUser.user._id}`);
        setProducts(response.data);

        // Fetch reviews data for each service
        const reviewsPromises = response.data.map((product) =>
          newRequest.get(`/reviews/${product._id}`).then((res) => res.data)
        );

        const reviewsResults = await Promise.all(reviewsPromises);

        const reviewsDataMap = {};
        reviewsResults.forEach((reviews, index) => {
          reviewsDataMap[response.data[index]._id] = reviews;
        });

        setReviewsData(reviewsDataMap);
      } catch (error) {
        setError('Error loading services.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser.user._id]);

 
  const handleOpen = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="add-service">
      <Header showSearch={false} />
      <div className="container">
        <div className="first-section">
          <h1 className="add-service-header">My Products</h1>
          {currentUser.user.isSeller && (
            <Link to="/create-product" className="link">
              <div className="button1">
                Add Product
                <img src={golf} className="golf" alt="Add Service" />
              </div>
            </Link>
          )}
        </div>

        {isLoading ? (
          'Loading...'
        ) : error ? (
          'Error loading services.'
        ) : products.length === 0 ? (
          <p className="error-message">You have no products yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
             
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                
                 
                <tr onClick={() => handleOpen(product._id)} key={product._id} style={{ marginBottom: '1rem' }}>
                  <td>
                    <img className="img" src={product.images[0]} alt="" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{reviewsData[product._id]?.length || 0}</td>
                  <td style={{ width: 'max-content', textAlign: 'center', verticalAlign: 'middle' }}>
                    <EditIcon />
                  </td>
               
                </tr>
           
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyProduct;
