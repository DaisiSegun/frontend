import React, { useState, useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Header from '../../components/header/Header';
import './SpProfile.scss';
import ratingIcon from '../../images/rating.svg';
import Reviews from '../../components/reviews/Reviews';
import golf from '../../images/golf.svg';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useParams, useNavigate } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser.js';
import swipeImg from '../../images/swipe.svg';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Use 100vh to make it full height */
`;

function SpProfile() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'View Profile';
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['service'],
    queryFn: () =>
      newRequest.get(`/services/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } =
    useQuery({
      queryKey: ['user'],
      queryFn: () =>
        newRequest.get(`/users/${userId}`).then((res) => {
          return res.data;
        }),
      enabled: !!userId,
    });

  const {  data: reviewsData } = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      newRequest.get(`/reviews/${id}`).then((res) => {
        return res.data;
      }),
  });

  if (isLoading || isLoadingUser) {
    return <ClipLoader color={'#36D7B7'} css={override} size={150} />;
  }

  if (error || errorUser) {
    return <div>network error, refresh page</div>;
  }

 

  const joinedDate = new Date(dataUser.createdAt);

  // Format the date in a more human-readable way
  const formattedJoinedDate = joinedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });

  const openWhatsApp = () => {
    
    if (!currentUser) {
      // If no user is logged in, redirect to the signup page
      navigate('/register');
    } else {
      const message = `I want to hire ${dataUser.username} (${data.title})`;
      const phoneNumber = '+2349019971557'; // Replace with the actual phone number
      // Construct the WhatsApp link
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      // Open the link in a new tab
      window.open(whatsappLink, '_blank');
    }
  };

  const currentUser = getCurrentUser();

  return (
    <HelmetProvider>
    <div className='sp-profile'>
      <Helmet>
      <title>{dataUser.username}'s Profile</title>
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.desc} />
      <meta property="og:image" content={data.images[0]} />
    </Helmet>

      <Header showSearch={true} />

      <h1 className='header-24px'>{data.title}</h1>

      <div className='profile-name-avatar-rating'>
        <div className='avatar-name'>
          <img src={dataUser.profilePicture} alt={`${dataUser.username}'s Profile`} className='profile-img' />
          <p className='profile-name'> {dataUser.username}</p>
        </div>

        <div className='rating-review'>
          <img src={ratingIcon} alt='Rating Icon' className='rating-icon' />
          <p className='rating-num'>
            {!isNaN(data.totalStars / data.starNumber) && Math.round(data.totalStars / data.starNumber)}
          </p>
          <p className='num-job-done'>({reviewsData.length})</p>
        </div>
      </div>

      <div className='main-section'>
        <div className='section-1'>
          <div className='img-container5'>
            <AwesomeSlider
              organicArrows={true}
              bullets={true}
              className='carousel'
              selected={currentIndex}
              onChange={setCurrentIndex}
            >
              {data.images.map((image, index) => (
                <div key={index} data-src={image} />
              ))}
            </AwesomeSlider>

            <div className='swipe'>
              <p className='swipe-text'>Swipe image</p>
              <img className='swipe-img' src={swipeImg} alt='Swipe Icon' />
            </div>
          </div>

          <div onClick={openWhatsApp} className='button1'>
            Request a Quote
            <img src={golf} alt='Golf Icon' className='golf' />
          </div>
          <h2 className='a-service'>About my service</h2>
          <p className='service-des'> {data.desc}</p>
        </div>

        <div className='section-2'>
             
             <div className='sp-info'>
             <div className='sp-des'>
                 <p className='light-des'>My location</p>
                 <p className='dark-des'>{data.shortDesc}</p>
               </div> 
               <div className='sp-des'>
                 <p className='light-des'>Interests</p>
                 <p className='dark-des'>{dataUser.interests}</p>
               </div>   
               <div className='sp-des'>
                 <p className='light-des'>Languages</p>
                 <p className='dark-des'>{dataUser.businessLocation}</p>
               </div> 
               <div className='sp-des'>
                 <p className='light-des'>Number of employees</p>
                 <p className='dark-des'>{data.certification}</p>
               </div> 
               <div className='sp-des'>
                 <p className='light-des'>Years of experience</p>
                 <p className='dark-des'>{data.yearsOfExperience}</p>
               </div>  
               <div className='sp-des'>
                 <p className='light-des'>Member since</p>
                 <p className='dark-des'>{formattedJoinedDate}</p>
               </div>
             </div>

          <div className='sp-profile'>
            <img className='sp-profile-img' src={dataUser.profilePicture} alt={`${dataUser.username}'s Profile`} />
            <p className='profile-name'>{dataUser.username}</p>
            <button onClick={openWhatsApp} className='button2'>
              Contact me
            </button>
          </div>
        </div>
      </div>

      <Reviews serviceId={id} />

      <div className='space1'></div>
    </div>
    </HelmetProvider>
  );
}

export default SpProfile;
