import React from 'react';
import { Link } from 'react-router-dom';
import './GroupCat.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SubLocal({ subCatData }) {
  return (
    <div className='group-cat'>
      {subCatData ? (
        subCatData.map((category, index) => (
          <Link key={index} to={`/findsp/${category.title}`} className='category-link'>
            <div className='group-cat-card'>
              <div className='title-group'>
                <p className='group-cat-title'>{category.title}</p>
              </div>
              <ArrowForwardIosIcon className='icon-nav' />
            </div>
          </Link>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default SubLocal;
