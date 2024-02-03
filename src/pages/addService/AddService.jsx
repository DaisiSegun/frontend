import React, { useState, useEffect } from 'react';

import './AddService.scss';
import Header from '../../components/header/Header';
import golf from '../../images/golf.svg';

import getCurrentUser from '../../utils/getCurrentUser';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import EditIcon from '@mui/icons-material/Edit';
function AddService() {
  useEffect(() => {
    document.title = 'My Service';
  }, []);
  const currentUser = getCurrentUser();
  const [services, setServices] = useState([]);
  const [reviewsData, setReviewsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/services/all?userId=${currentUser.user._id}`);
        setServices(response.data);

        // Fetch reviews data for each service
        const reviewsPromises = response.data.map((service) =>
          newRequest.get(`/reviews/${service._id}`).then((res) => res.data)
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

  // const handleDelete = async (serviceId) => {
  //   if (window.confirm('Are you sure you want to delete this service?')) {
  //     try {
  //       await newRequest.delete(`/services/${serviceId}`);
  //       setServices((prevServices) => prevServices.filter((service) => service._id !== serviceId));
  //     } catch (error) {
  //       console.error('Error deleting service:', error);
  //     }
  //   }
  // };
  const handleOpen = (serviceId) => {
    navigate(`/edit-service/${serviceId}`);
  };

  return (
    <div className="add-service">
      <Header showSearch={false} />
      <div className="container">
        <div className="first-section">
          <h1 className="add-service-header">My Services</h1>
          {currentUser.user.isSeller && (
            <Link to="/createservice" className="link">
              <div className="button1">
                Add Service
                <img src={golf} className="golf" alt="Add Service" />
              </div>
            </Link>
          )}
        </div>

        {isLoading ? (
          'Loading...'
        ) : error ? (
          'Error loading services.'
        ) : services.length === 0 ? (
          <p className="error-message">You have no services yet.</p>
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
              {services.map((service) => (
                
                 
                <tr onClick={() => handleOpen(service._id)} key={service._id} style={{ marginBottom: '1rem' }}>
                  <td>
                    <img className="img" src={service.images[0]} alt="" />
                  </td>
                  <td>{service.title}</td>
                  <td>{service.price}</td>
                  <td>{reviewsData[service._id]?.length || 0}</td>
                  <td style={{ width: 'max-content', textAlign: 'center', verticalAlign: 'middle' }}>
                    <EditIcon />
                  </td>
                  {/* <td>
                    <img
                      className="delete"
                      src={deleteService}
                      alt="Delete"
                      onClick={() => handleDelete(service._id)}


                    />
                    <p>Delete Service</p>
                  </td> */}
                </tr>
           
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AddService;
