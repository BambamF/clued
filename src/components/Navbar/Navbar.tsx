import React from 'react';
import { useState } from 'react';
import MenuButton from './MenuButton/MenuButton';
import SearchBar from './SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  

  return (
    <nav id='app-navbar'>
        <MenuButton/>
        <header id='app-header'>memory bank</header>
        <SearchBar/>
    </nav>
  )
}



export default Navbar