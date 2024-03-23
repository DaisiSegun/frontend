import React from 'react'
import './AllCategory.scss'
import FreelanceCategory from './FreelanceCategory'
import HandMadeCategory from './HandMadeCategory'
import LocalCategory from './LocalCategory'
import categoryData from '../../data/freelanceCat.json';
import categoryData2 from '../../data/handMadeCat.json';
import categoryData3 from '../../data/LocalCat.json';

function AllCategory() {
  return (
    <div className='all-category'>
      
      <div className='all-cat-section'>
      
      <h3 className='group-cat-header'>Freelance services</h3>

     
      <FreelanceCategory categoryData={categoryData} />

      </div>

      <div className='all-cat-section'>

      <h3 className='group-cat-header'>Handmade items</h3>

   
      <HandMadeCategory  categoryData2={categoryData2} />
     

      </div>
      
      <div className='all-cat-section'>

      <h3 className='group-cat-header'>Local services</h3>

     
      <LocalCategory categoryData3={categoryData3}/>
     
      </div>

    </div>
  )
}

export default AllCategory