import React from 'react'
import AllCategory from '../../components/allCategory/AllCategory'
import Header from '../../components/header/Header'
import './AllCategories.scss'
import NavBar from '../../components/navBar/NavBar'

function AllCategories() {
  return (
    <div className='all-cat'>

      <Header showSearch={true} />
      <AllCategory/>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/>
    </div>
  )
}

export default AllCategories