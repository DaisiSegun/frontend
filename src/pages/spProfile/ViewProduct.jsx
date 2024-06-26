import React, { useState, useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Header from '../../components/header/Header';
import './SpProfile.scss';
import ratingIcon from '../../images/rating.svg';
import Reviews from '../../components/reviews/Reviews';

import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useParams, useNavigate } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser.js';
import swipeImg from '../../images/swipe.svg';
import { CircleLoader } from "react-spinners";

import { Helmet } from 'react-helmet';

// import load from '../../images/load.gif'
// import NavBar from '../../components/navBar/NavBar.jsx';






function ViewProduct() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'View Product';
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const { id } = useParams();

 

  const { isLoading, error, data } = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      newRequest.get(`/products/single/${id}`).then((res) => {
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

  useEffect(() => {
    if (dataUser && data) {
      document.title = `${dataUser.username}'s Profile`;

      // const metaTags = [
      //   { name: 'og:title', content: `${dataUser.username}'s Profile` },
      //   { name: 'og:description', content: data.desc || '' },
      //   { name: 'og:image', content: data.images && data.images.length > 0 ? data.images[0] : '' },
      //   { name: 'og:url', content: window.location.href },
      // ];

      // metaTags.forEach((tag) => {
      //   const existingTag = document.head.querySelector(`meta[property="${tag.name}"]`);
      //   if (existingTag) {
      //     existingTag.content = tag.content;
      //   } else {
      //     const newTag = document.createElement('meta');
      //     newTag.setAttribute('property', tag.name);
      //     newTag.content = tag.content;
      //     document.head.appendChild(newTag);
      //   }
      // });
    }
  }, [dataUser, data]);
  

  if (isLoading || isLoadingUser) {
    return (
      <div className='loader2'>
      <Header showSearch={true} />
    <div className='load-page2'>
    <p className='load-text'>Loading. please kindly wait..</p>
   
    
    </div>

    {/* <NavBar/> */}
 
  </div>
    );
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

  const openSellerDetails = async () => {
    setIsLoading(true); // Set isLoading state to true
  
    const orderData = {
      title: data.title,
      seller: {
        name: dataUser.username,
        email: dataUser.email,
        phone: dataUser.phone,
      },
      client: {
        name: currentUser.user.username,
        email: currentUser.user.email,
        phone: currentUser.user.phone,
      },
    };
  
    try {
      const response = await newRequest.post('/orders', orderData);
      console.log('Order created:', response.data);
      
      navigate('/seller-details', {
        state: {
          sellerName: dataUser.username,
          serviceName: data.title,
          phoneNumber: dataUser.phone,
        },
      });
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsLoading(false); // Set isLoading state to false after API request completes
    }
  };

  const openSeller = () => {
    
    if (!currentUser) {
      // If no user is logged in, redirect to the signup page
      localStorage.setItem('intendedAction', 'requestQuote');
      localStorage.setItem('productId', id);
      navigate('/register');
    } else {
    
      openSellerDetails(); 
     
    }
  };

  const currentUser = getCurrentUser();
  
  const Sid = currentUser?.user?._id || '';
  const Uid = dataUser?._id || '';
  

  return (

    <> 

    <Helmet>
          <meta property="og:title" content={`${dataUser.username}'s Profile`} />
        <meta property="og:description" content={data.desc || ''} />
        <meta property="og:image" content={data.images && data.images.length > 0 ? data.images[0] : ''} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
  
    <div className='sp-profile'>
    
    

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
          {!isNaN(dataUser.totalStars / dataUser.starNumber) && (dataUser.totalStars / dataUser.starNumber).toFixed(1)}
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

            <p className='product-price1'>₦ {data.price}</p>

            {data.images.length > 1 && (
            <div className='swipe4'>
              <p className='swipe-text4'>Swipe image</p>
              <img className='swipe-img4' src={swipeImg} alt='Swipe Icon' />
            </div>
          )}
            
          </div>

        

          <div className='button1' onClick={openSeller}>
            {loading ? (
              <div className="loading-wrapper">
                <CircleLoader color={"#36D7B7"} size={20} />
                <span>Loading..</span>
              </div>
            ) : (
              'Contact Seller'
            )}
          </div>

          <h2 className='a-service'>About product</h2>
          <p className='service-des'> {data.desc}</p>
        </div>

        <div className='section-2'>
             
             <div className='sp-info'>
             {/* <div className='sp-des'>
                 <p className='light-des'>My location</p>
                 <p className='dark-des'>{dataUser.location}</p>
               </div>  */}
               <div className='sp-des'>
                  <p className='light-des'>Interests</p>
                  {dataUser.interests ? (
                    <p className='dark-des'>
                      {dataUser.interests
                        .split(' ')
                        .slice(0, 5)
                        .join(' ')}
                      {dataUser.interests.split(' ').length > 5 ? '...' : ''}
                    </p>
                  ) : (
                    <p className='dark-des'>No interests listed</p>
                  )}
                </div>
                  
                <div className='sp-des'>
                  <p className='light-des'>Languages</p>
                  {dataUser.businessLocation ? (
                    <p className='dark-des'>{dataUser.businessLocation}</p>
                  ) : (
                    <p className='dark-des'>No languages listed</p>
                  )}
                </div>
              
                
               <div className='sp-des'>
                 <p className='light-des'>Joined</p>
                 <p className='dark-des'>{formattedJoinedDate}</p>
               </div>
             </div>

          <div className='sp-profile'>
            <img className='sp-profile-img' src={dataUser.profilePicture} alt={`${dataUser.username}'s Profile`} />
            <p className='profile-name'>{dataUser.username}</p>
          
          </div>
        </div>
      </div>

      <Reviews  Sid= {Sid}  Uid={Uid} serviceId={id} sellerId={userId} />


      <div className='space1'></div>
    </div>
    </> 
   
  );
}

export default ViewProduct;