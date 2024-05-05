import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { UsersContext } from './Context';

function App() {
  const [users, setUsers] = useState<string[]>([])
  
  return (
    <UsersContext.Provider value={{users, setUsers}}>
      <div id='app-wrapper'>
      <Navbar/>
      <main id='app-main'>
        {users.map((user, index) => <p key={index}>{user}</p>)}
      </main>
    </div>
    </UsersContext.Provider>
    
  )
}

export default App
