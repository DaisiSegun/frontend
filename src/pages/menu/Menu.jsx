import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Menu.scss'
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className='menu'>

      <Header/>
      
      <div className="menu-con">

    
     
        <Link to='/register' className="menu-nav">
          Sign up
          <ArrowForwardIosIcon/>
        </Link>

       
        <Link to='/contact-us' className="menu-nav">
          Contact us
          <ArrowForwardIosIcon/>
          </Link>

          
        <Link to='/seller-dashboard' className="menu-nav">
          Seller's Dashboard
          <ArrowForwardIosIcon/>
          </Link>


          <Link to='/terms&conditions' className="menu-nav">
          Terms & Conditions
          <ArrowForwardIosIcon/>
          </Link>

      </div>

      <NavBar/> 

    </div>
  )
}

export default Menu