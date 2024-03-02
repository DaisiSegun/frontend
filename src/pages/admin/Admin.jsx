import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Admin.scss'
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className='menu'>

      <Header/>
      
      <div className="menu-con">

    
     
        <Link to='/all-users' className="menu-nav">
          All users
          <ArrowForwardIosIcon/>
        </Link>

       
        <Link to='/all-services' className="menu-nav">
          All services
          <ArrowForwardIosIcon/>
          </Link>


          <Link to='/all-products' className="menu-nav">
          All products
          <ArrowForwardIosIcon/>
          </Link>

          <Link to='/add' className="menu-nav">
          Upload Product Category
          <ArrowForwardIosIcon/>
          </Link>

          <Link to='/add-service' className="menu-nav">
          Upload Service Category
          <ArrowForwardIosIcon/>
          </Link>

      </div>

      <NavBar/> 

    </div>
  )
}

export default Admin