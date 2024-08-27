import {useState} from 'react';
import userIcon from '../../../public/assets/userIcon.png';
import './ProfileButton.css';
import MenuBox from './MenuBox/MenuBox';

const ProfileButton = () => {
  const [menuClicked, setMenuClicked] = useState(false);

  const handleProfileClick = () => {
    setMenuClicked(!menuClicked);
  }

  return (
    <div id='profile-button-wrapper'>
      <button id='nav-profile-button' onClick={handleProfileClick}><img id='nav-profile-img' alt='nav-profile-img' src={userIcon}/></button>
      {menuClicked && <MenuBox setMenuClicked={setMenuClicked}/>}
    </div>
    
    
  )
}

export default ProfileButton