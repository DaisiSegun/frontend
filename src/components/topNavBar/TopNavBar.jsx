import React from 'react'
import './TopNavBar.scss'
import cat from '../../images/cat.svg'

function TopNavBar() {
  return (
    <div className='top-nav'>

      <div className='t-cat' >
          <img alt='root-categories' src={cat} className='t-cat-img'/>

          <p className='t-text'>
            See all categories
          </p>
          


      </div>

      </div>
  )
}

export default TopNavBar