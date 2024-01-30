import React from 'react';
import './SpCard.scss';
import spProfile from '../../images/avatar.jpg';
import rating from '../../images/rating.svg';
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

  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', item._id],
    queryFn: () =>
      newRequest.get(`/reviews/${item._id}`).then((res) => {
        return res.data;
      }),
  });

  const openProfile = () => {
    window.open(`/#/view-profile/${item._id}`, '_blank');
  };

  return (
    <div className='sp-card' onClick={openProfile} style={{ cursor: 'pointer' }}>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <>
          <div className='sec1'>
            <img src={data?.profilePicture || spProfile} className='sp-profile-img' alt={`Profile of ${data.username}`} />
          </div>

          <div className='sp-card-text-contianer'>
            <div className='sp-title-contianer'>
              <div className='sp-name-title-container'>
                <h1 className='sp-title'> {item.title} </h1>
                <p className='sp-name-small'> {data.username} </p>
              </div>
              <div className='rating-container'>
                <img src={rating} className='rating-icon' alt='Rating' />
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
            <button className='view-profile'>View Profile</button>
          </div>
        </>
      )}
    </div>
  );
}

export default SpCard;
