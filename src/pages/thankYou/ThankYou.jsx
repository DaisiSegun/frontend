import React, {useEffect} from 'react'
import getCurrentUser from '../../utils/getCurrentUser'
import welcome from '../../images/welcome.gif'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Header from '../../components/header/Header';
import './ThankYou.scss'
import Slider from '../../components/slider/Slider';
function ThankYou() {

  useEffect(() => {
    document.title = 'Welcome';
  }, []);
  const currentUser = getCurrentUser();

  return (

    <div className='thank-you'>
   
    <div className='sorry-container'>



    <div className='sorry-con'>  <p className='sorry-header'>  Thank you for choosing Root</p> <div className='sorry-name'> <p> {currentUser.user.username}</p> < FavoriteIcon className='love' /></div>   </div>
    <img className='sryImg' src={welcome} />

    <Link className='link' to="/">
    <button  className='sorry-button'>Go Home</button>
    </Link>
  
</div>


</div>
  )
}

export default ThankYou