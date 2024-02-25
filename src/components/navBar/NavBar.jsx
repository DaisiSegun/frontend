import React from 'react'
import homeIcon from '../../images/homeicon.svg'
import serviceIcon from '../../images/serviceicon.svg'
import productIcon from '../../images/aproduct.svg'
import menuIcon from '../../images/newmenu.svg'
import './NavBar.scss'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav'>

      
    <Link className='link' to="/">
      <div className='icon-container'>
        <img className='nav-icon' src={homeIcon} />
        <p className='nav-text'>Home</p>
      </div>
      </Link>

      <Link className='link' to="/services">
      
      <div className='icon-container'>
        <img className='nav-icon' src={serviceIcon} />
        <p className='nav-text'>Services</p>
      </div>

      </Link>

      <Link className='link' to="/all-product">
      
      <div className='icon-container'>
        <img className='nav-icon' src={productIcon} />
        <p className='nav-text'>African products</p>
      </div>
      </Link>

      <Link className='link' to="/menu">
      <div className='icon-container'>
        <img className='nav-icon' src={menuIcon} />
        <p className='nav-text'>Menu</p>
      </div>
      </Link>
    </div>
  )
}

export default NavBar