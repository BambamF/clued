import React, { useContext } from 'react';
import MenuButton from './MenuButton/MenuButton';
import SearchBar from './SearchBar/SearchBar';
import { Link } from "react-router-dom";
import './Navbar.css';
import { SignedInContext } from '../../Context';
import userIcon from '../../public/assets/userIcon.png'

const Navbar = () => {

  const {signedIn} = useContext(SignedInContext);
  

  return (
    <nav id='app-navbar'>
        <MenuButton/>
        <Link to='/' id='header-link'><h3>Clued</h3></Link>
        <div id='nav-search-profile-wrapper'>
        <SearchBar/>
        {signedIn ? <Link to="/sign-in" id='navbar-signin-link'><h5>sign in</h5></Link> : <div id='nav-profile-button'><img id='nav-profile-img' src={userIcon}/></div>}
        </div>
    </nav>
  )
}



export default Navbar