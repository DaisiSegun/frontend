import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './GroupCat.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function HandMadeCategory({ categoryData2 }) {
  return (
    <div className='group-cat'>
      {categoryData2.map((category, index) => (
        <Link key={index} to={`/select-category/${category.title}`} className='category-link'>
          <div className='group-cat-card'>
            <div className='title-group'>
              <p className='group-cat-title'>{category.title}</p>
              <p className='small-text-cat'>{category.desc}</p>
            </div>
            <ArrowForwardIosIcon className='icon-nav' />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HandMadeCategory;
