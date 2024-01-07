import React, { useState, useEffect } from 'react';
import './CatCard.scss';
import { Link } from 'react-router-dom';
import { css } from "@emotion/react"; 
import { CircleLoader } from "react-spinners";
import newRequest from '../../utils/newRequest.js';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function CatCard({ categoryId }) {
  const [catData, setCatData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        // Define the API endpoint for fetching cat data by ID
        const apiUrl = `/cat/${categoryId}`; // Update the URL based on your API

        // Make a GET request to the backend to fetch cat data
        const response = await newRequest.get(apiUrl);

        // Update the state with the fetched cat data
        setCatData(response.data);
      } catch (error) {
        // Handle errors, e.g., log the error or show an error message
        console.error('Error fetching cat data:', error);
      } finally {
        // Set loading to false once the data is fetched or if there's an error
        setLoading(false);
      }
    };

    // Call the function to fetch data
    fetchCatData();
  }, [categoryId]);

  if (loading) {
    // Render a loading state or placeholder while waiting for data
    return <CircleLoader color={"#36D7B7"} css={override} size={20} />;
  }

  if (!catData) {
    // Render an error state if data is not available
    return <p>Error loading data</p>;
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
