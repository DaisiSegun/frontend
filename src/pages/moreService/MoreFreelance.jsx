import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import FreelanceCatCard from '../../components/CatCard/FreelanceCatCard';
import './MoreService.scss';
import load from '../../images/load.gif';
import staticCatData2  from './StaticData2'; // Import your static data
import NavBar from '../../components/navBar/NavBar';

function MoreFreelance() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this based on your preference
  const matchingCatData = staticCatData2 ; // Use your static data
  useEffect(() => {
    setLoading(false);
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
      <h1 className='header-24px'>Freelance Services</h1>
      <div className='root-services-section'>
        <div className='cat-container'>
          {loading ? (
            <p className='load-text'>Loading <img className='load-gif' src={load} alt='Loading..'/>  please wait..</p>
          ) : (
            catDataToDisplay.map((cat) => (
              <FreelanceCatCard key={cat.id} categoryId={cat.id} /> // Assuming `categoryId` is used to uniquely identify each category
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
      <div style={{ marginBottom: '6rem' }}></div>
      <NavBar/>
    </div>
  );
}

export default MoreFreelance;
