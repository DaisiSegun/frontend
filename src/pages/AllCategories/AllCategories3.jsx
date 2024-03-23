import React from 'react'
import AllCategory3 from '../../components/allCategory/AllCategory3'
import Header from '../../components/header/Header'
import './AllCategories.scss'
import NavBar from '../../components/navBar/NavBar'

function AllCategories3() {
  return (
    <div className='all-cat'>

      <Header showSearch={true} />
      <AllCategory3/>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/>
    </div>
  )
}

export default AllCategories3