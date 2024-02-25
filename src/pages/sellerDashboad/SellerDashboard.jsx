import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './SellerDashboard.scss';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { Link } from 'react-router-dom';

function SellerDashboard() {
 

  return (
    <div className='menu'>

    <Header/>
    
    <div className="menu-con">

      <h5>Seller's Dashboard</h5>
    
      <Link to='/myservice' className="menu-nav">
        My services
        <ArrowForwardIosIcon/>
      </Link>

     
      <Link to='/my-product' className="menu-nav">
        My Products
        <ArrowForwardIosIcon/>
        </Link>


    
    </div>

    <NavBar/> 

  </div>
  );
}

export default SellerDashboard;


