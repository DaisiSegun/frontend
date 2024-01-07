import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import footerIcon from '../../images/group.svg';

function Footer() {
  // Replace 'whatsapp://send?phone=1234567890' with the actual WhatsApp link containing your phone number
  const whatsappLink = 'whatsapp://send?phone=+2349019971557';

  return (
    <div className='footer'>
      <img src={footerIcon} className='footer-icon' alt='Footer Icon' />
      <p className='footer-text'>2024 Root</p>
      <p className='footer-text'>.</p>
      <Link to='/terms&conditions' className='footer-text'>Privacy & policies</Link>
      <p className='footer-text'>.</p>
      <a href={whatsappLink} className='footer-text' target='_blank' rel='noopener noreferrer'>Contact us</a>
    </div>
  );
}

export default Footer;
