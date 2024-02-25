import React from 'react'
import './SelectSearch.scss'
import { Link } from 'react-router-dom';
import searchService from '../../images/search-service.svg'
import searchProduct from '../../images/search-product.svg'
import NavBar from '../../components/navBar/NavBar';

function SelectSearch() {
  return (

    <div className='select1'>
      <div className='select'>

 
        <h1 className='select-text'>Select to search a service or product</h1>
     
      <div className="select-container">

          <Link to="/search-service" className='link'>

          <div className="select-button">
              <img className='ss-img' src={searchService} alt="" />
              <p className='btn-text'>Services</p>
          </div>
          </Link>
          
          <Link to="/search-product" className='link'>

          <div className="select-button">
            <img className='ss-img' src={searchProduct} alt="" />
            <p className='btn-text'>Handmade items</p>
          </div>

          </Link>

      </div>

      </div>
      <NavBar/>
    </div>
  )
}

export default SelectSearch