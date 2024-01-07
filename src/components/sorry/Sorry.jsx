import React from 'react'
import './Sorry.scss'
import sorrtImg from '../../images/sryImg.svg'

function Sorry() {

  const openWhatsApp = () => {
  
    const phoneNumber = "+2349019971557"; // Replace with the actual phone number
  
    // Construct the WhatsApp link
    const whatsappLink = `https://wa.me/${phoneNumber}`;
  
    // Open the link in a new tab
    window.open(whatsappLink, "_blank");
  };

  return (

    <div className='sorry-container1'>
        <h1 className='sorry-header'>We are sorry this service is not available yet</h1>
        <p className='sorry-text'>Regardless, please feel free to contact us, and we'll go the extra mile to find this service provider from out network for you</p>
        <button onClick={openWhatsApp} className='sorry-button'>Contact us</button>
        <img className='sryyImg' src={sorrtImg} />

    </div>
  )
}

export default Sorry