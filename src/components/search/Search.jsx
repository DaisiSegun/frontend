import React, { useState } from "react";
import './Search.scss';
import search from '../../images/search-icon.svg';
import axios from 'axios'; // Import axios
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search-result?search=${input}`);
    setInput(""); // Clear the input field after navigating
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    // Fetch suggestions using axios directly
    try {
      const response = await axios.get(`http://localhost:5000/api/services/service-suggestions?search=${inputValue}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one
  };

  return (
    <div className='search-container'>
      <div className='search-container-2'>
        <input
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={input}
          className='search'
          placeholder='Which service do you require?'
        />

        <div onClick={handleSubmit} className='search-icon-container'>
          <img className='icon' src={search} alt="Search" />
        </div>

        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
