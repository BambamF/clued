import React, { useContext } from 'react';
import ProfileButton from './ProfileButton/ProfileButton';
import SearchBar from './SearchBar/SearchBar';
import { Link } from "react-router-dom";
import './Navbar.css';
import { SignedInContext } from '../../Context';
import notificationsIcon from '../../public/assets/notificationsIcon.png';
import createClueIcon from '../../public/assets/createClueIcon.png';

const Navbar = () => {

  const {signedIn} = useContext(SignedInContext);
  

  return (
    <nav id='app-navbar'>
        {signedIn ? <ProfileButton/> : <Link to={"/sign-in"} id='nav-sign-in-link'>sign in</Link>}
        <Link to='/' id='header-link'><h3>Clued</h3></Link>
        <div id='nav-search-profile-wrapper'>
        <SearchBar/>
        <button id='create-clue-button'><img id='create-clue-icon' src={createClueIcon} alt='create-clue-icon'/></button>
        <button id='notifications-button'><img id='notifications-icon' alt='notifications-icon' src={notificationsIcon}/></button>
        </div>
    </nav>
  )
}



export default Navbar