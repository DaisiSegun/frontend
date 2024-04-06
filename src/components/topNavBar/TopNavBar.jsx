import React from 'react'
import './TopNavBar.scss'
import cat from '../../images/cat.svg'
import blogIcon from '../../images/blogicon.svg'
import { Link } from 'react-router-dom'

function TopNavBar() {
  return (
    <div className='top-nav'>

<div className='top-con'>

<div className='t-cat' >
          <img alt='root-categories' src={blogIcon} className='t-cat-img'/>


        <a href='/blog'  className='link10'>

          <p className='t-text'>
            Root blog
          </p>

       </a>
          


      </div>
      <div className='t-cat' >
          <img alt='root-categories' src={cat} className='t-cat-img'/>


        <Link to='/all-categories' className='link10'>

          <p className='t-text'>
            See all categories
          </p>

       </Link>
          


      </div>

     

    </div>
      </div>
  )
}

export default TopNavBar