import React, { useState, useEffect } from 'react';

import { ClipLoader } from 'react-spinners';
import Header from '../../components/header/Header';
import newRequest from '../../utils/newRequest';
import CatCard from '../../components/CatCard/CatCard';
import './MoreService.scss';

function MoreService() {
  useEffect(() => {
    document.title = 'More Services';
  }, []);
  const [catData, setCatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12; // Change this based on your preference
  const matchingCatData = catData; // Assuming all catData items should be displayed

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/cat/all`);
        setCatData(response.data.cats);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const catDataToDisplay = matchingCatData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < matchingCatData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='more'>
      <Header showSearch={true} />

      <h1 className='header-24px'>Root Services</h1>

      <div className='root-services-section'>
        <div className='cat-container'>
          {loading ? (
            <ClipLoader color='#36D7B7' loading={loading} size={150} />
          ) : (
            catDataToDisplay.map((cat) => (
              <CatCard key={cat.category} categoryId={cat._id} />
            ))
          )}
        </div>

        <div className='pagination-buttons'>
          <button
            className='previous-button'
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className='next-button'
            onClick={handleNextPage}
            disabled={endIndex >= matchingCatData.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreService;
