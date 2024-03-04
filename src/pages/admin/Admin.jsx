import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Admin.scss'
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import { Link } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();



  if (!currentUser || !currentUser.user.isAdmin) {
    // Redirect to a different page if the user is not an admin
    navigate('/');
    return null; // Render nothing while redirecting
  }
  return (
    <div className='menu'>

      <Header/>
      
      <div className="menu-con">

      <h4>Root Admin</h4>
    
     
        <Link to='/allusers' className="menu-nav">
          All users
          <ArrowForwardIosIcon/>
        </Link>

       
        <Link to='/all-services' className="menu-nav">
          All services
          <ArrowForwardIosIcon/>
          </Link>


          <Link to='/all-products' className="menu-nav">
          All products
          <ArrowForwardIosIcon/>
          </Link>

        

          <Link to='/create-servicecat' className="menu-nav">
          Upload Service Category
          <ArrowForwardIosIcon/>
          </Link>

      </div>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/> 

    </div>
  )
}

export default Admin