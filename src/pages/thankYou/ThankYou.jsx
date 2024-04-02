import React from 'react';
import { Link } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser';
import go from '../../images/letsgo.gif';

import FavoriteIcon from '@mui/icons-material/Favorite';
import './ThankYou.scss';

function ThankYou() {
  const handleContinue = () => {
    // Check for intended action and SP ID in local storage
    const intendedAction = localStorage.getItem('intendedAction');
    const spId = localStorage.getItem('spId');

    if (intendedAction === 'requestQuote' && spId) {
      // Redirect to the SP profile page with the SP ID
      window.open(`/view-profile/${spId}`, '_blank');
    }

    localStorage.removeItem('intendedAction');
    localStorage.removeItem('spId');
  };

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
        <img className='email-sent' src={go} alt='Email Sent' />
        <Link className='link' to='/' onClick={handleContinue}>
          <button className='sorry-button'>Continue</button>
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
