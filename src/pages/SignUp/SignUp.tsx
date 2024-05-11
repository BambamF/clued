import React, {useState} from 'react';
import './SignUp.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hidePasswordIcon from '../../public/assets/hidePasswordIcon.png';
import showPasswordIcon from '../../public/assets/showPasswordIcon.png';
import { Link } from 'react-router-dom';



const SignUp = () => {
    const [newDate, setNewDate] = useState<Date>(new Date())
    const [showCreatePassword, setShowCreatePassword] = useState<boolean>(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true)

    const handleCreatePasswordReveal = () => {
        setShowCreatePassword(!showCreatePassword)
    }

    const handleConfirmPasswordReveal = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

  return (
    <div id='signup-wrapper'>
        <form id='signup-form'>
            <p>Sign Up</p>
            <label id='firstname-signup-label'>First Name:<input type='text' className='signup-input' ></input></label>

            <label id='lastname-signup-label'>Last Name:<input type='text' className='signup-input' ></input></label>

            <label id='username-signup-label'>Username:<input type='text' className='signup-input' ></input></label>

            <div id='create-password-wrapper' className='password-wrapper' >
               <label id='createpassword-signup-label'>Password:<input type={showCreatePassword ? 'password' : 'text'} className='signup-input' id='create-password-input'></input></label> 
               {showCreatePassword ?    <img src={showPasswordIcon} 
                                            alt='show password icon' 
                                            className='password-icon'
                                            onClick={handleCreatePasswordReveal}/> 
                                    : 
                                        <img src={hidePasswordIcon} 
                                            alt='hide password icon'
                                            className='password-icon'
                                            onClick={handleCreatePasswordReveal}/>}
            </div>

            <div id='confirm-password-wrapper' className='password-wrapper'>
               <label id='confirmpassword-signup-label'>Confirm Password:<input type={showConfirmPassword ? 'password' : 'text'} className='signup-input' id='confirm-password-input'></input></label> 
               {showConfirmPassword ?   <img src={showPasswordIcon} 
                                            alt='show password icon'
                                            className='password-icon'
                                            onClick={handleConfirmPasswordReveal}/> 
                                    :   <img src={hidePasswordIcon} 
                                            alt='hide password icon'
                                            className='password-icon'
                                            onClick={handleConfirmPasswordReveal}/>}
            </div>

            <label id='dob-signup-label'>D.O.B:<DatePicker selected={newDate} locale="enGB" onChange={(date: Date) => setNewDate(date)} className='signup-input' id='dob-signup-input'/></label> 
            <div id='signin-submit'>
                <Link to={"/sign-in"}>Already have an account?</Link>
                <button id='signup-submit-button'>submit</button>    
            </div>   
        </form>
    </div>
  )
}

export default SignUp