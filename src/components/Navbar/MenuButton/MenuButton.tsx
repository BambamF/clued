import React from 'react';
import menuButton from '../../../public/assets/menuButton.png';
import './MenuButton.css'

const MenuButton = () => {
  return (
    <button id='menu-button'><img src={menuButton} alt='menuButton' id='menu-button-img'/></button>
  )
}

export default MenuButton