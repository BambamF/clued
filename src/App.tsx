import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersContext } from './Context';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch/NoMatch';

function App() {
  const [users, setUsers] = useState<string[]>([])
  
  return (
    <UsersContext.Provider value={{users, setUsers}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UsersContext.Provider>
    
  )
}

export default App
