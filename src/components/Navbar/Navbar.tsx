import React from 'react';
import MenuButton from './MenuButton/MenuButton';
import SearchBar from './SearchBar/SearchBar';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  

  return (
    <nav id='app-navbar'>
        <MenuButton/>
        <header id='app-header'><Link to='/'>memory bank</Link></header>
        <SearchBar/>
    </nav>
  )
}



export default Navbar