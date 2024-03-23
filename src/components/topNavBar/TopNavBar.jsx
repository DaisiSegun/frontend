import React from 'react'
import './TopNavBar.scss'
import cat from '../../images/cat.svg'
import { Link } from 'react-router-dom'

function TopNavBar() {
  return (
    <div className='top-nav'>

      <div className='t-cat' >
          <img alt='root-categories' src={cat} className='t-cat-img'/>


        <Link to='/all-categories' className='link10'>

          <p className='t-text'>
            See all categories
          </p>

       </Link>
          


      </div>

      </div>
  )
}

export default TopNavBar