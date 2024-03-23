import React from 'react';
import './Sorry.scss';
import sorrtImg from '../../images/sryImg.svg';

function Sorry3() {

  const openWhatsApp = () => {
  
    const phoneNumber = "+2349019971557"; // Replace with the actual phone number
  
    // Construct the WhatsApp link
    const whatsappLink = `https://wa.me/${phoneNumber}`;
  
    // Open the link in a new tab
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className='sorry-container1'>
      <h1 className='sorry-header'>Coming Soon!!!</h1>
      <p className='sorry-text'>Feel free to contact us, and we'll do our best to find the service/product for you right away from our network of sellers</p>
      <button onClick={openWhatsApp} className='sorry-button'>Contact us</button>
      <img className='sryyImg' src={sorrtImg} alt='' />

    </div>
  );
}

export default Sorry3;


