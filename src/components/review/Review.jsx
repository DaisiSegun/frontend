import React from 'react';
import './Review.scss';
import star from '../../images/rating.svg';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import spProfile from '../../images/avatar.jpg';

function Review({ review }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className='rev-con'>
      <div className='reviews'>
        {data ? (
          <div className='review-title-container'>
            <img className='avatar-test' src={data?.profilePicture || spProfile} alt='Avatar' />
            <h1 className='review-title'>{data.username}</h1>
          </div>
        ) : null}

        <div className='reviw-rating'>
          <h1 className='rating-text'>Rating:</h1>
          <img src={star} alt='Star' />
          <p className='rating-num'>{review.star}</p>
        </div>

        <p className='review-des'>{review.desc}</p>
      </div>
    </div>
  );
}

export default Review;
