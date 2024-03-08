import React, {useState} from 'react';
import './SpCard.scss';
import spProfile from '../../images/avatar.jpg';
import rating from '../../images/rating.svg';
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';

function SpCardAdmin({ item, index }) {
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


  const [expanded, setExpanded] = useState(false);

  return (
    <div className='sp-card' >
       {index && <p style={{ marginRight: '0.3rem' }}>{index}.</p>}
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
               

                <div className='admin-watch'>
                  <p className='admin-text'>Name:</p>
                <p className='sp-name-small2'  > {data.username} </p>
                </div>

                <div className='admin-watch'>
                <p className='admin-text'> Service:</p>
                <p className='sp-name-small2' > {item.title}</p>
                </div>

                <div className='admin-watch'>
                <p className='admin-text'>Phone:</p>
                <p className='sp-name-small2'  > {data.phone} </p>
                </div>


                <div className='admin-watch'>
                <p className='admin-text'>Email:</p>
                <p className='sp-name-small2' >{data.email}</p>
                </div>

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

            <p className="limit-text">
  {expanded ? item.desc : item.desc.split(' ').slice(0, 20).join(' ')}
  {item.desc.split(' ').length > 20 && !expanded && (
    <>
      {'... '}
      <span
        className="read-more"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(true);
        }}
      >
        Read more
      </span>
    </>
  )}
</p>
            <div className='starting-price'>
              <p className='starting-price-text'>Base fee:</p>
              <div className='price-container'>
                <small>₦ {item.price}</small>
              </div>
            </div>
          </div>

        
        </>
      )}
    </div>
  );
}

export default SpCardAdmin;
