import React, { useContext } from 'react';
import './MenuBox.css';
import { useNavigate } from 'react-router-dom';
import { SignedInContext, UserContext } from '../../../../Context';

interface MenuClickedProps{
  setMenuClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuBox = ({setMenuClicked}: MenuClickedProps) => {
    const {setSignedIn} = useContext(SignedInContext)
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const handleProfileNavigate = () => {
      if (user?.id) {
        navigate(`/profile/${user.id}`);
        setMenuClicked(false);
      }
    }

    const handleCluesNavigate = () => {
      if (user?.id) {
        navigate(`/clues/${user.id}`);
        setMenuClicked(false);
      }
    }
/*
    const handleSettingsNavigate = () => {
      if (user?.id) {
        navigate(`/settings/${user.id}`);
        setMenuClicked(false);
      }
    }
*/
    const handleSignOut = () => {
      setSignedIn(false);
      setMenuClicked(false);
    }
  return (

    <div id='menu-box'>
        <button onClick={handleProfileNavigate} className='menu-link'>Profile</button>
        <button onClick={handleCluesNavigate} className='menu-link'>Clues</button>
        {
          /*
          <button onClick={handleSettingsNavigate} className='menu-link'>Settings</button>
          */
        }
        <button className='menu-link' id='sign-out-link' onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default MenuBox