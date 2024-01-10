import React, { useEffect } from 'react';
import getCurrentUser from '../../utils/getCurrentUser';
import welcome from '../../images/welcome.gif';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './ThankYou.scss';

function ThankYouSp() {
  useEffect(() => {
    document.title = 'Welcome Sp';
  }, []);

  const currentUser = getCurrentUser();

  return (
    <div className='thank-you'>
      <div className='sorry-container'>
        <div className='sorry-con'>
          <p className='sorry-header'>Thank you for choosing Root</p>
          <div className='sorry-name'>
            <p>{currentUser.user.username}</p> <FavoriteIcon className='love' />
          </div>
        </div>
        <img className='sryImg' src={welcome} alt='Welcome GIF' />
        <Link className='link' to='/myservice'>
          <button className='sorry-button'>Go Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ThankYouSp;
