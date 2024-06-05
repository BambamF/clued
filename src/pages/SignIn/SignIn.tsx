import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import instagramIcon from '../../public/assets/instagramIcon.png';
import tiktokIcon from '../../public/assets/tiktokIcon.png';
import pinterestIcon from '../../public/assets/pinterestIcon.png';
import showPasswordIcon from '../../public/assets/showPasswordIcon.png';
import hidePasswordIcon from '../../public/assets/hidePasswordIcon.png';
import { SignedInContext } from '../../Context';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
    .min(8, { message: "Password must be 8 or more characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Password must contain at least one special character",
  }),
})

type FormFields = z.infer<typeof schema>;

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(true)
    const {signedIn, setSignedIn} = useContext(SignedInContext)
    const {register, handleSubmit, formState: {errors, isSubmitting}, setError} = useForm<FormFields>({resolver: zodResolver(schema)});

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSigninSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data)

        await axios.post("http://localhost:5000/sign-in", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log("Server Response:", response);
            setSignedIn(true);
        })
        .catch((error) => {
            if (error.response) {
                // Extract error message from response
                const { message } = error.response.data;
                if (message.includes("User not found or incorrect password")) {
                    setError("email", {
                        type: "manual",
                        message: "Email not found or incorrect password"
                    });
                    setError("password", {
                        type: "manual",
                        message: "Email not found or incorrect password"
                    });
                }
            }
        }
    )}

  return (
    <div id='signin-wrapper'>
        <form id='signin-form' onSubmit={handleSubmit(handleSigninSubmit)}>
            <p id='signin-header'>Sign In</p>
            <input type='email' className='signin-input' placeholder='email' {...register("email")}/>
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            <div id='password-wrapper'>
                <input type={!showPassword ? 'text' : 'password'} className='signin-input' id='password-input' placeholder='password' {...register("password")}/>
                <img    src={showPassword ? showPasswordIcon : hidePasswordIcon} 
                        alt={showPassword ? 'show-password-icon' : 'hide-password-icon'}
                        className='password-icon'
                        onClick={handleShowPassword}
                />
            </div>
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            <div id='signup-submit'>
                <Link to={"/sign-up"}>sign up</Link>
                <button id='signin-submit-button' type='submit' disabled={isSubmitting}>{isSubmitting ? "loading..." : "submit"  }</button>
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