import React from 'react';
import rating from '../../images/rating.svg';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import './ProductCard.scss';
import Profile from '../../images/avatar.jpg';

function ProductCard({ item, index }) {
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
    window.open(`/#/view-product/${item._id}`, '_blank');
  };

  console.log(item);

  return (
    <div onClick={openProfile}  className='product-card'>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <>
          <div className='image-con'>
            <img src={item.images[0]} className='product-img' alt={item.title} />
            <img src={data?.profilePicture || Profile} className='avatar-img' alt='Avatar' />
          </div>
          <div className='title-cont'>
            <p className='title-texts'>{item.title}</p>
            <div className='rating-cont'>
              <img className='rate-img' src={rating} alt='Rating' />


              <p className='rate'>
                  {!isNaN(item.totalStars / item.starNumber) &&
                    Math.round(item.totalStars / item.starNumber)}
                </p>

              {reviewsData && reviewsData.length > 0 && (
              <p className='rate'> ({reviewsData.length})</p>
              )}
            </div>
          </div>
          <p className='product-price'>₦ {item.price}</p>
        </>
      )}
    </div>
  );
}

export default ProductCard;
