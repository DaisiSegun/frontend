import React, { useState } from 'react';
import './Header.scss';
import logo from '../../images/rootlogo.svg';
import Search from '../search/Search';
import { Link, useNavigate } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import profileImg from '../../images/avatar.jpg';
import newRequest from '../../utils/newRequest.js';

function Header({ showSearch }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownContent, setShowDropdownContent] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleDropdownContent = () => {
    setShowDropdownContent(!showDropdownContent);
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const currentUser = getCurrentUser();

  return (
    <div className='header'>
      <div className='header-container'>
        <Link className='link' to='/'>
          <img className='root-logo' src={logo} alt='Root Logo' />
        </Link>

        <div className="sectionBContainer">
          {showSearch && <Search />}
        </div>

        <div className='links'>
          {currentUser ? (
            <div className='drop-cont'>
              <div className='log-out' onClick={toggleDropdownContent}>
              <img className='pro-img' src={currentUser?.user?.profilePicture || profileImg} alt={currentUser?.user?.username || 'User Profile'} />

                <p className='pro-name'>{currentUser?.user?.username}</p>
                <ArrowDropDownIcon className='pro-icon' />
              </div>
              {showDropdownContent && (
                <div className='dropdown-content-log'>
                  <button className='log-drop' onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className='link' to='/sign-in'>
              <p className='small-text-blue'>Sign in</p>
            </Link>
          )}

          <div className='dropdown'>
            <button className='button-1' onClick={toggleDropdown}>
              Contact Us
            </button>
            {showDropdown && (
              <div className='dropdown-content'>
                <Link className='drop-text' to='tel:+2349019971557'>
                  Call us
                </Link>
                <a className='drop-text' href='https://wa.me/+2349019971557'>
                  Text us
                </a>
                <Link className='drop-text' to='mailto:rootsgotyou@gmail.com'>
                  Send us an Email
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
