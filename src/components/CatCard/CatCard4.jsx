import React from 'react';
import './CatCard.scss';
import { Link } from 'react-router-dom';
import staticCatData3 from '../../pages/home/StaticData3';


function CatCard3({ categoryId }) {
  // Find the category data based on the categoryId
  const catData = staticCatData3.find(cat => cat.id === categoryId);

  // Check if catData is found
  if (!catData) {
    return <p>Category not found</p>; // Or handle this case in a way that fits your application
  }

  return (
    <Link className='link8' to={`/findsp/${catData.category}`}>
      <div className='cat-card'>
        <img src={catData.image} className='cat-img' alt={catData.title} />
        <h1 className='title-text'>{catData.title.length > 21 ? catData.title.slice(0, 21) + '...' : catData.title}</h1>

        <p className='smallest-text-gray'>{catData.desc}</p>
      </div>
    </Link>
  );
}

export default CatCard3;
