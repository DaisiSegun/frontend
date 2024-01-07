import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import Header from '../../components/header/Header';
import homeImg from '../../images/home.svg';
import Search from '../../components/search/Search';
import CatCard from '../../components/CatCard/CatCard';
import ContentLoader from 'react-content-loader';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import Testimonial from '../../components/testimonial/Testimonial';
import Footer from '../../components/footer/Footer';
import { css } from "@emotion/react";
import newRequest from '../../utils/newRequest';

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    newRequest
      .get('/cat/all')
      .then(response => {
        const shuffledCatData = response.data.cats.sort(() => Math.random() - 0.5);
        const limitedCatData = shuffledCatData.slice(0, 8);
        setCatData(limitedCatData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
        setLoading(false);
      });
  }, []);

  const navigateToFindSP = () => {
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
            <>
              {[1, 2, 3, 4].map((index) => (
                <ContentLoader
                  key={index}
                  speed={2}
                  width={200}
                  height={250}
                  viewBox="0 0 200 250"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="10" ry="10" width="200" height="150" />
                  <rect x="10" y="170" rx="3" ry="3" width="180" height="10" />
                  <rect x="10" y="190" rx="3" ry="3" width="120" height="10" />
                </ContentLoader>
              ))}
            </>
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
