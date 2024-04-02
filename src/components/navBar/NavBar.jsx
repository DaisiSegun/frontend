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

      
    <a className='link' href='https://roothq.africa/'>
      <div className='icon-container'>
        <img className='nav-icon' src={homeIcon} alt=''  />
        <p className='nav-text'>Home</p>
      </div>
      </a>

      <a className='link'  href='https://roothq.africa/services'>
      
      <div className='icon-container'>
        <img className='nav-icon' src={serviceIcon} alt=''  />
        <p className='nav-text'>Services</p>
      </div>

      </a>

      <a className='link'href='https://roothq.africa/all-product'>
      
      <div className='icon-container'>
        <img className='nav-icon' src={productIcon} alt=''  />
        <p className='nav-text'>African products</p>
      </div>
      </a>

      <Link className='link' to="/menu">
      <div className='icon-container'>
        <img className='nav-icon' src={menuIcon} alt=''  />
        <p className='nav-text'>Menu</p>
      </div>
      </Link>
    </div>
  )
}

export default NavBar