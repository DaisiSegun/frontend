import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Menu.scss';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { Link } from 'react-router-dom';

function ContactUs() {
  return (
    <div className='menu'>

      <Header/>
      
      <div className="menu-con">

        <a href="tel:+2349019971557" className="menu-nav">
          Call us
          <ArrowForwardIosIcon/>
        </a>

        <a href="https://wa.me/+2349019971557" className="menu-nav">
          Message us
          <ArrowForwardIosIcon/>
        </a>

        <a href="mailto:support@roothq.africa" className="menu-nav">
          Email us
          <ArrowForwardIosIcon/>
        </a>

        <a href="https://www.instagram.com/rootsgotyou" className="menu-nav">
          Instagram
          <ArrowForwardIosIcon/>
        </a>

        <a href="https://twitter.com/rootsgotyou" className="menu-nav">
          Twitter
          <ArrowForwardIosIcon/>
        </a>

      </div>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/> 

    </div>
  );
}

export default ContactUs;
