import React from 'react';
import searchButton from '../../../public/assets/searchButton.png';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <form id='searchbar-wrapper'>
        <input type='text' id='nav-search-bar' placeholder='search...'/>
        <button id='search-button'><img src={searchButton} id='search-button-img' alt='search-button'/></button>
    </form>
   
  )
}

export default SearchBar