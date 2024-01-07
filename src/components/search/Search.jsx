import React, { useState } from "react";
import './Search.scss';
import search from '../../images/search-icon.svg';
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
  
    navigate(`/search-result?search=${input}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className='search-container'>
      <div className='search-container-2'>
        <input
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          value={input}
          className='search'
          placeholder='Which service do you require? '
        />

        <div onClick={handleSubmit} className='search-icon-container'>
          <img className='icon' src={search} alt="Search" />
        </div>
      </div>
    </div>
  );
}

export default Search;
