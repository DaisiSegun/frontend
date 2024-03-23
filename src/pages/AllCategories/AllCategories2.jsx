import React from 'react'
import AllCategory2 from '../../components/allCategory/AllCategory2'
import Header from '../../components/header/Header'
import './AllCategories.scss'
import NavBar from '../../components/navBar/NavBar'

function AllCategories2() {
  return (
    <div className='all-cat'>

      <Header showSearch={true} />
      <AllCategory2/>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/>
    </div>
  )
}

export default AllCategories2