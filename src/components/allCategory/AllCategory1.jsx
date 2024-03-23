import React from 'react'
import './AllCategory.scss'
import FreelanceCategory from './FreelanceCategory'

import categoryData from '../../data/freelanceCat.json';

function AllCategory1() {
  return (
    <div className='all-category2'>
      
      <div className='all-cat-section'>
      
      <h3 className='group-cat-header'>Freelance services</h3>

     
      <FreelanceCategory categoryData={categoryData} />

      </div>


    </div>
  )
}

export default AllCategory1