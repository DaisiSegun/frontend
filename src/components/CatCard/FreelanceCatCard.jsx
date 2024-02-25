import React from 'react';
import './CatCard.scss';
import { Link } from 'react-router-dom';

import staticCatData2 from '../../pages/moreService/StaticData2';

function FreelanceCatCard({ categoryId }) {
  const catData = staticCatData2.find((cat) => cat.id === categoryId);

  if (!catData) {
    return <p>Category not found for categoryId: {categoryId}</p>;
  }

  const { category, image, title, desc } = catData;

  return (
    <Link className='link8' to={`/findsp/${category}`}>
      <div className='cat-card'>
        <img src={image} className='cat-img' alt={title} />
        <h1 className='title-text'>{title}</h1>
        <p className='smallest-text-gray'>{desc}</p>
      </div>
    </Link>
  );
}


export default FreelanceCatCard;
