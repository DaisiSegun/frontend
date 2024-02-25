import React from 'react'
import Search from '../../components/search/Search'
import NavBar from '../../components/navBar/NavBar';
function SearchService() {

  const placeholder = 'Which service do you require?';
  return (
    <div className='search-point'>

    <div className='searchpoint'>
         <Search placeholder={placeholder} />
    </div>
  <NavBar/>
  </div>
  )
}

export default SearchService