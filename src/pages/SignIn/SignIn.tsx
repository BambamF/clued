import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import instagramIcon from '../../public/assets/instagramIcon.png';
import tiktokIcon from '../../public/assets/tiktokIcon.png';
import pinterestIcon from '../../public/assets/pinterestIcon.png';
import showPasswordIcon from '../../public/assets/showPasswordIcon.png';
import hidePasswordIcon from '../../public/assets/hidePasswordIcon.png';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(true)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

  return (
    <div id='signin-wrapper'>
        <form id='signin-form'>
            <p>Sign In</p>
            <input type='email' className='signin-input' placeholder='email'/>
            <div id='password-wrapper'>
                <input type={!showPassword ? 'text' : 'password'} className='signin-input' id='password-input' placeholder='password'/>
                <img    src={showPassword ? showPasswordIcon : hidePasswordIcon} 
                        alt={showPassword ? 'show-password-icon' : 'hide-password-icon'}
                        className='password-icon'
                        onClick={handleShowPassword}
                />
            </div>
            <div id='signup-submit'>
                <Link to={"/sign-up"}>sign up</Link>
                <button id='signin-submit-button'>submit</button>
            </div>
            <div id='social-icons-div'>
                <img src={instagramIcon} alt='instagram-icon' id='instagram-icon' className='social-signin-icon'/>
                <img src={tiktokIcon} alt='tiktok-icon' id='tiktok-icon' className='social-signin-icon'/>
                <img src={pinterestIcon} alt='pinterest-icon' id='pinterest-icon' className='social-signin-icon'/>
            </div>
        </form>
    </div>
  )
}

export default SignIn