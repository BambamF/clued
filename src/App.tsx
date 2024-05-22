import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersContext, SignedInContext } from './Context';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch/NoMatch';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Memories from './pages/Memories/Memories';
import Settings from './pages/Settings/Settings';

function App() {
  const [users, setUsers] = useState<string[]>([])
  const [signedIn, setSignedIn] = useState<boolean>(false)
  
  return (
    <SignedInContext.Provider value={{signedIn, setSignedIn}}>
      <UsersContext.Provider value={{users, setUsers}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='memories' element={<Memories/>}/>
            <Route path='settings' element={<Settings/>}/>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UsersContext.Provider>
    </SignedInContext.Provider>
  )
}

export default App
