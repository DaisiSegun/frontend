import React from 'react';
import { useLocation } from 'react-router-dom';
import './SellerDetails.scss';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';

function SellerDetails() {
  const location = useLocation();
  const { sellerName, serviceName, phoneNumber } = location.state || {};

  const sendWhatsAppMessage = () => {
    let formattedPhoneNumber = phoneNumber;
    if (phoneNumber.startsWith('0')) {
      formattedPhoneNumber = `+234${phoneNumber.slice(1)}`;
    }
    const message = encodeURIComponent(`I'd like to place an order for ${serviceName} from ${sellerName}. I discovered you on Root's marketplace and I'm interested`);
    window.open(`https://wa.me/${formattedPhoneNumber}?text=${message}`, '_blank');
  };
  
  

  const makePhoneCall = () => {
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  return (
    <div>
      <Header />
      <div className='seller-con'>
      <div className='seller-details'>
      <h1 className='seller-header'>Contact {sellerName} for {serviceName}</h1>
        <button className='phone-call' onClick={makePhoneCall}>
          Give phone call
        </button>
        <button className='whatsapp-message' onClick={sendWhatsAppMessage}>
          Message on WhatsApp
        </button>
        <p className='phone-num'>Seller's Number: {phoneNumber}</p>
        <div style={{ marginBottom: '5rem' }}></div>
        <NavBar />
      </div>
    </div>
    </div>
  );
}

export default SellerDetails;
