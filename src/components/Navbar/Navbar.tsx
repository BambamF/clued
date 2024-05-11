import React from 'react';
import MenuButton from './MenuButton/MenuButton';
import SearchBar from './SearchBar/SearchBar';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  

  return (
    <nav id='app-navbar'>
        <MenuButton/>
        <Link to='/' id='header-link'><h3>memory bank</h3></Link>
        <SearchBar/>
    </nav>
  )
}



export default Navbar