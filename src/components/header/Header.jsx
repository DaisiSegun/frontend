import React, { useState } from 'react';
import './Header.scss';
import logo from '../../images/rootlogo.svg';
import Search2 from '../search/Search2';
import { Link } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import profileImg from '../../images/avatar.jpg';
import newRequest from '../../utils/newRequest.js';
import { ClipLoader } from 'react-spinners'; 
import TopNavBar from '../topNavBar/TopNavBar.jsx';

function Header({ showSearch }) {
  // const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownContent, setShowDropdownContent] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  const toggleDropdownContent = () => {
    setShowDropdownContent(!showDropdownContent);
  };


  const handleLogout = async () => {
    try {
      setLoadingLogout(true); // Set loading state to true
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
     
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLogout(false); // Reset loading state
    }
  };
  const currentUser = getCurrentUser();

  const openEditProfile = () => {
    // Open a new browser window for the Edit Profile page
    window.open('/edit-profile', '_blank');
  };

  const openMyService = () => {
    // Open a new browser window for the My Service page
    window.open('/seller-dashboard', '_blank');
  };
  const openWhatsApp = () => {
    const message = "I want to join Root as a seller";
    const phoneNumber = "+2349019971557"; // Update with your WhatsApp number
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };


  return (
    <div>
    <div className='header'>
      <div className='header-container'>
        <Link className='link' to='/'>
          <img className='root-logo' src={logo} alt='Root Logo' />
        </Link>

        <div className="sectionBContainer">
          {showSearch && <Search2 />}
        </div>

        <div className='links'>
          {currentUser ? (
            <div className='drop-cont'>
              <div className='log-out' onClick={toggleDropdownContent}>
            {loadingLogout ? (
              <ClipLoader size={20} color={'#36D7B7'} loading={loadingLogout} />
            ) : (
              <>
                <img className='pro-img' src={currentUser?.user?.profilePicture || profileImg} alt={currentUser?.user?.username || 'User Profile'} />
                <p className='pro-name'>{currentUser?.user?.username.length > 10 ? currentUser?.user?.username.substring(0, 10) + '..' : currentUser?.user?.username}</p>
                <ArrowDropDownIcon className='pro-icon' />
              </>
            )}
          </div>
              {showDropdownContent && (
                <div className='dropdown-content-log'>
                 <div className='dropdown-content2'>
                 <Link className='drop-text' onClick={openEditProfile}  >
                  Edit Profile
                  </Link>
                <Link className='drop-text' onClick={openMyService} >
                 Seller Dashboard
                </Link>
                <Link className='drop-text' onClick={handleLogout}>
                  Log out
                </Link>
              </div>  
                </div>
              )}
            </div>
          ) : (
            <Link className='link' to='/sign-in'>
              <p className='small-text-blue'>Sign in</p>
            </Link>
          )}

         

          <div className='dropdown'>
          <button className='button-1' onClick={openWhatsApp}>
            Become a Seller
          </button>
           
          </div>
        </div>
      </div>
  
    </div>
   <TopNavBar/>
   </div>
  );
}

export default Header;
