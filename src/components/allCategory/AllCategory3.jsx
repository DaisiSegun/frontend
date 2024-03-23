import React from 'react'
import './AllCategory.scss'

import LocalCategory from './LocalCategory'

import categoryData3 from '../../data/LocalCat.json';

function AllCategory3() {
  return (
    <div className='all-category2'>
      
      
      
      <div className='all-cat-section'>

      <h3 className='group-cat-header'>Local services</h3>

     
      <LocalCategory categoryData3={categoryData3}/>
     
      </div>

    </div>
  )
}

export default AllCategory3