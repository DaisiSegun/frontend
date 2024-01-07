import React, { useState, useEffect } from 'react';
import './CatCard.scss';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import newRequest from '../../utils/newRequest.js';

function CatCard({ categoryId }) {
  const [catData, setCatData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const apiUrl = `/cat/${categoryId}`;
        const response = await newRequest.get(apiUrl);
        setCatData(response.data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatData();
  }, [categoryId]);

  if (loading) {
    // Render a placeholder loader while waiting for data
    return (
      <ContentLoader
        speed={2}
        width={200}
        height={250}
        viewBox="0 0 200 250"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="200" height="150" />
        <rect x="10" y="170" rx="3" ry="3" width="180" height="10" />
        <rect x="10" y="190" rx="3" ry="3" width="120" height="10" />
      </ContentLoader>
    );
  }

  if (!catData) {
    return <p>Error loading image</p>;
  }

  return (
    <Link className='link8' to={`/findsp/${catData.cat.category}`}>
      <div className='cat-card'>
        <img src={catData.cat.image} className='cat-img' alt={catData.title} />
        <h1 className='title-text'>{catData.cat.title}</h1>
        <p className='smallest-text-gray'>{catData.cat.desc}</p>
      </div>
    </Link>
  );
}

export default CatCard;
