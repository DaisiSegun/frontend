import React from 'react';
import './Sorry.scss';
import sorrtImg from '../../images/sryImg.svg';

function Sorry2() {

  const openWhatsApp = () => {
  
    const phoneNumber = "+2349019971557"; // Replace with the actual phone number
  
    // Construct the WhatsApp link
    const whatsappLink = `https://wa.me/${phoneNumber}`;
  
    // Open the link in a new tab
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className='sorry-container1'>
      <h1 className='sorry-header'>This product is Coming soon!!!</h1>
      <p className='sorry-text'>Feel free to contact us, and we'll do our best to find the product for you as soon as possible from our network of sellers</p>
     
      <button onClick={openWhatsApp} className='sorry-button'>Contact us</button>
      <img className='sryyImg' src={sorrtImg} alt='' />

    </div>
  );
}

export default Sorry2;
