import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext, SignedInContext } from './Context';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch/NoMatch';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Clues from './pages/Clues/Clues';
import Settings from './pages/Settings/Settings';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

function App() {

  type User = {
    id: string;
     firstName: string;
     lastName: string;
     email: string;
     username: string;
     dob: string;
   }

  const [user, setUser] = useState<User | null>(null)
  const [signedIn, setSignedIn] = useState<boolean>(false)

  
  
  return (
    <div id='app-wrapper'>
      <SignedInContext.Provider value={{signedIn, setSignedIn}}>
      <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
            <Route path='user/:id' element={
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            />
            <Route 
              path='profile/:id' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route 
              path='clues/:id' element={
                <ProtectedRoute>
                  <Clues />
                </ProtectedRoute>
              }
            />
            <Route 
              path='settings/:id' element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </SignedInContext.Provider>
    </div>
    
  )
}

export default App
