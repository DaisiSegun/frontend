import React from 'react'
import SearchProducts from '../../components/search/SearchProducts'
import './searchPoint.scss'
import NavBar from '../../components/navBar/NavBar';

function SearchProduct() {
  const placeholder = 'Find handmade items';
  return (
    <div className='search-point'>

      <div className='searchpoint'>
      <SearchProducts placeholder={placeholder} />
      </div>
      <NavBar/>
    </div>
  )
}

export default SearchProduct