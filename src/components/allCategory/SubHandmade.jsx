import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from React Router
import './GroupCat.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function SubHandmade({subCatData3}) {
  return (
    <div className='group-cat'>
      {subCatData3.map((category, index) => (
        <Link key={index} to={`/products/${category.title}`} className='category-link'>
          <div className='group-cat-card'>
            <div className='title-group'> 
              <p className='group-cat-title'>{category.title}</p>
            </div>
            <ArrowForwardIosIcon className='icon-nav' />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SubHandmade