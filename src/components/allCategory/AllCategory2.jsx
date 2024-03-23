import React from 'react'
import './AllCategory.scss'

import HandMadeCategory from './HandMadeCategory'

import categoryData2 from '../../data/handMadeCat.json';


function AllCategory2() {
  return (
    <div className='all-category2'>
      
   

      <div className='all-cat-section'>

      <h3 className='group-cat-header'>Handmade items</h3>

   
      <HandMadeCategory  categoryData2={categoryData2} />
     

      </div>
      
     

    </div>
  )
}

export default AllCategory2