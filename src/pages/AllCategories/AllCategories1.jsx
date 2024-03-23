import React from 'react'
import AllCategory1 from '../../components/allCategory/AllCategory1'
import Header from '../../components/header/Header'
import './AllCategories.scss'
import NavBar from '../../components/navBar/NavBar'

function AllCategories1() {
  return (
    <div className='all-cat'>

      <Header showSearch={true} />
      <AllCategory1/>
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/>
    </div>
  )
}

export default AllCategories1