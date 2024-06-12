import React from 'react';
import './MenuBox.css';
import { Link } from 'react-router-dom';

const MenuBox = () => {
  return (
    <div id='menu-box'>
        <Link to={'/profile'} className='menu-link'>profile</Link>
        <Link to={'/clues'} className='menu-link'>clues</Link>
        <Link to={'/settings'} className='menu-link'>settings</Link>
    </div>
  )
}

export default MenuBox