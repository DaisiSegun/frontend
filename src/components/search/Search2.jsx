import React from "react";
import './Search.scss';
import search from '../../images/search-icon.svg';
import { useNavigate } from "react-router-dom";

function Search2() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/select-search`);
  };

  return (
    <div className='search-container'>
      <div className='search-container-2'>
      <button
  onClick={handleNavigate}
  className='search'
  style={{ color: 'lightgray', backgroundColor: 'transparent', textAlign: 'start' }}
>
  Discover African talents & products
</button>

        <div onClick={handleNavigate} className='search-icon-container'>
          <img className='icon' src={search} alt="Search" />
        </div>
      </div>
    </div>
  );
}

export default Search2;
