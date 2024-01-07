import React from 'react';
import './SpCard.scss';
import spProfile from '../../images/avatar.jpg';
import rating from '../../images/rating.svg';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';

function SpCard({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  const { isLoading: isLoadingReviews, error: errorReviews, data: reviewsData } = useQuery({
    queryKey: ['reviews', item._id],
    queryFn: () =>
      newRequest.get(`/reviews/${item._id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className='sp-card'>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <>
          <div className='sec1'>
            <Link className='link' to={`/view-profile/${item._id}`}>
              <img src={data?.profilePicture || spProfile} className='sp-profile-img' />
            </Link>
          </div>

          <div className='sp-card-text-contianer'>
            <div className='sp-title-contianer'>
              <Link className='link' to={`/view-profile/${item._id}`}>
                <div className='sp-name-title-container'>
                  <h1 className='sp-title'> {item.title} </h1>
                  <p className='sp-name-small'> {data.username} </p>
                </div>
              </Link>
              <div className='rating-container'>
                <img src={rating} className='rating-icon' />
                <p className='rating'>
                  {!isNaN(item.totalStars / item.starNumber) &&
                    Math.round(item.totalStars / item.starNumber)}
                </p>
                {reviewsData && reviewsData.length > 0 && (
                  <p className='num-job-done'>({reviewsData.length})</p>
                )}
              </div>
            </div>
            <p className='service-description'>{item.shortDesc}.</p>

            <div className='starting-price'>
              <p className='starting-price-text'>Base fee:</p>
              <div className='price-container'>
                <small>₦ {item.price}</small>
              </div>
            </div>
          </div>

          <div className='sec2'>
            <Link className='link' to={`/view-profile/${item._id}`}>
              <button className='view-profile'>View Profile</button>
            </Link>
          </div>
        
        </>
      )}

    
    </div>
  );
}

export default SpCard;
