import React from 'react';
import './CatCard.scss';
import { Link } from 'react-router-dom';

import staticCatData3 from '../../pages/moreService/StaticData3';

function ProductCatCard({ categoryId }) {
  const catData = staticCatData3.find((cat) => cat.id === categoryId);

  if (!catData) {
    return <p>Category not found for categoryId: {categoryId}</p>;
  }

  const { category, image, title, desc } = catData;

  return (
    <Link className='link8' to={`/products/${category}`}>
      <div className='cat-card'>
        <img src={image} className='cat-img' alt={title} />
        <h1 className='title-text'>{title}</h1>
        <p className='smallest-text-gray'>{desc}</p>
      </div>
    </Link>
  );
}


export default ProductCatCard;
