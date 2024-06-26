import React, { useContext } from 'react';
import './MenuBox.css';
import { Link, useNavigate } from 'react-router-dom';
import { SignedInContext, UserContext } from '../../../../Context';

const MenuBox = () => {
    const {setSignedIn} = useContext(SignedInContext)
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const handleProfileNavigate = () => {
      if (user?.id) navigate(`/profile/${user.id}`);
    }

    const handleCluesNavigate = () => {
      if (user?.id) navigate(`/clues/${user.id}`);
    }

    const handleSettingsNavigate = () => {
      if (user?.id) navigate(`/settings/${user.id}`);
    }

    const handleSignOut = () => {
      setSignedIn(false);
    }
  return (

    <div id='menu-box'>
        <button onClick={handleProfileNavigate} className='menu-link'>Profile</button>
        <button onClick={handleCluesNavigate} className='menu-link'>Clues</button>
        <button onClick={handleSettingsNavigate} className='menu-link'>Settings</button>
        <button className='menu-link' id='sign-out-link' onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default MenuBox