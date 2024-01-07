import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import Header from '../../components/header/Header';
import homeImg from '../../images/home.svg';
import Search from '../../components/search/Search';
import CatCard from '../../components/CatCard/CatCard';

import Testimonial from '../../components/testimonial/Testimonial';
import Footer from '../../components/footer/Footer';

import { css } from "@emotion/react";
import { CircleLoader } from "react-spinners";
import newRequest from '../../utils/newRequest';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Home() {
  useEffect(() => {
    document.title = 'Root';
  }, []);
  const [catData, setCatData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch category data from the backend when the component mounts
    newRequest
      .get('/cat/all')
      .then(response => {
        // Shuffle the catData
        const shuffledCatData = response.data.cats.sort(() => Math.random() - 0.5);
  
        // Limit it to 8 items
        const limitedCatData = shuffledCatData.slice(0, 8);
  
        setCatData(limitedCatData);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const navigateToFindSP = () => {
    // Navigate to the '/findsp' page using useNavigate
    navigate('/more-service');
  };

  return (
    <div className='home'>
      <Header showSearch={false} />
      <img className='home-img' src={homeImg} alt="Home" />
      <h1 className='header-32px'>Hire a Service Provider in Lagos</h1>
      <div className='search6'>
      <Search />

      </div>
      
      <h1 className='header-24px'>Services on Root</h1>

      <div className='root-services-section'>
        <div className='cat-container'>
          {/* Display CatCard components with data from the backend */}
          {loading ? (
            <CircleLoader color={"#36D7B7"} css={override} size={20} />
          ) : (
            catData.map((cat) => (
              <CatCard key={cat.category} categoryId={cat._id} />
            ))
          )}
        </div>

        {/* Show more button to navigate to '/findsp' page */}
        <button className='load-more-button' onClick={navigateToFindSP}>
          View More
          <CallMissedOutgoingIcon className='load-more-icon' />
        </button>
      </div>

      <h1 className='header-28px'>See what our Customers are saying about Root</h1>
      <div className='testimonial-container'>
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
     
      <Footer />
    </div>
  );
}

export default Home;