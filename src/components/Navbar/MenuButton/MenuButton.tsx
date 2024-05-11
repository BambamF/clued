import React, {useState} from 'react';
import menuButton from '../../../public/assets/menuButton.png';
import './MenuButton.css'
import MenuBox from './MenuBox/MenuBox';

const MenuButton = () => {
  const [menuClicked, setMenuClicked] = useState(false);

  const handleMenuClick = () => {
    setMenuClicked(!menuClicked);
  }

  return (
    <div id='menu-button-wrapper'>
      <button id='menu-button' onClick={handleMenuClick}><img src={menuButton} alt='menuButton' id='menu-button-img'/></button>
      {menuClicked && <MenuBox/>}
    </div>
    
    
  )
}

export default MenuButton