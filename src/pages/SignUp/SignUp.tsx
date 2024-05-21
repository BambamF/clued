import React, { useState, useEffect } from 'react';
import './SignUp.css';
import "react-datepicker/dist/react-datepicker.css";
import hidePasswordIcon from '../../public/assets/hidePasswordIcon.png';
import showPasswordIcon from '../../public/assets/showPasswordIcon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { format, parse } from 'date-fns';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const dateValidation = z
  .string()
  .refine((val) => {
    const parsedDate = parse(val, 'yyyy-MM-dd', new Date());
    return !isNaN(parsedDate.getTime());
  }, {
    message: "Invalid date format. Expected yyyy-MM-dd"
  })
  .transform((val) => format(parse(val, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'));

const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    createPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    dob: dateValidation,
  }).refine((data) => data.createPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  type FormFields = z.infer<typeof schema>;

  const SignUp = () => {
      const [showCreatePassword, setShowCreatePassword] = useState<boolean>(true);
      const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
      const [dob, setDob] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
      const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormFields>({
          resolver: zodResolver(schema)
      });
  
      const handleCreatePasswordReveal = () => {
          setShowCreatePassword(!showCreatePassword);
      };
  
      const handleConfirmPasswordReveal = () => {
          setShowConfirmPassword(!showConfirmPassword);
      };
  
      const handleSignupSubmit: SubmitHandler<FormFields> = async (data) => {
          console.log(data);
  
          await axios.post("http://localhost:5000/sign-up", data, {
              headers: {
                  'Content-Type': 'application/json'
              }
          })
              .then(response => {
                  console.log("Server response:", response);
                  // Redirect or show success message
              })
              .catch((error) => {
                  if (error.response) {
                      // Extract error message from response
                      const { message } = error.response.data;
                      if (message.includes("Email already exists")) {
                          setError("email", {
                              type: "manual",
                              message: "This email is already taken"
                          });
                      }
                      if (message.includes("Username already exists")) {
                          setError("username", {
                              type: "manual",
                              message: "This username is already taken"
                          });
                      }
                  }
              });
      };
  
      return (
          <div id='signup-wrapper'>
              <form id='signup-form' onSubmit={handleSubmit(handleSignupSubmit)}>
                  <p>Sign Up</p>
                  <label id='firstname-signup-label'>First Name:<input type='text' className='signup-input' id='firstname' {...register("firstName")}
                  ></input></label>
                  {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}
  
                  <label id='lastname-signup-label'>Last Name:<input type='text' className='signup-input' id='lastname' {...register("lastName")}
                  ></input></label>
                  {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}
  
                  <label id='username-signup-label'>Username:<input type='text' className='signup-input' id='username' {...register("username")}
                  ></input></label>
                  {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
  
                  <label id='email-signup-label'>Email:<input type='email' className='signup-input' id='email' {...register("email")}
                  ></input></label>
                  {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
  
                  <div id='create-password-wrapper' className='password-wrapper' >
                      <label id='createpassword-signup-label'>Password:<input type={showCreatePassword ? 'password' : 'text'} className='signup-input' id='create-password-input' {...register("createPassword")}
                      ></input></label>
                      {showCreatePassword ? <img src={showPasswordIcon}
                          alt='show password icon'
                          className='password-icon'
                          onClick={handleCreatePasswordReveal} />
                          :
                          <img src={hidePasswordIcon}
                              alt='hide password icon'
                              className='password-icon'
                              onClick={handleCreatePasswordReveal} />}
                  </div>
                  {errors.createPassword && <span className='text-red-500'>{errors.createPassword.message}</span>}
  
                  <div id='confirm-password-wrapper' className='password-wrapper'>
                      <label id='confirmpassword-signup-label'>Confirm Password:<input type={showConfirmPassword ? 'password' : 'text'} className='signup-input' id='confirm-password-input' {...register("confirmPassword")}
                      ></input></label>
                      {showConfirmPassword ? <img src={showPasswordIcon}
                          alt='show password icon'
                          className='password-icon'
                          onClick={handleConfirmPasswordReveal} />
                          : <img src={hidePasswordIcon}
                              alt='hide password icon'
                              className='password-icon'
                              onClick={handleConfirmPasswordReveal} />}
                  </div>
                  {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
  
                  <label id='dob-signup-label'>D.O.B:<input
                      type="date"
                      {...register('dob')}
                      value={dob} // Set the value in yyyy-MM-dd format
                      onChange={(e) => setDob(e.target.value)}
                      className='signup-input'
                      id='dob-signup-input'
                  /></label>
                  {errors.dob && <span className='text-red-500'>{errors.dob.message}</span>}
                  <div id='signin-submit'>
                      <Link to={"/sign-in"}>Already have an account?</Link>
                      <button id='signup-submit-button' type='submit' disabled={isSubmitting}>{isSubmitting ? "loading..." : "submit"}</button>
                  </div>
              </form>
          </div>
      );
  };
  
  export default SignUp;