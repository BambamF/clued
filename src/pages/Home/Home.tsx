import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    dob: string;
  }

  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async() => {
     await axios.get("http://localhost:5000/users")
          .then((response) => {
              console.log(response.data.users)
              setUsers(response.data.users)
          })
          .catch((e) => console.log(e))
  }

  useEffect(() => {
      fetchUsers()
  }, [])
   
  return (
    <div id='home-wrapper'>
      {
      users.length > 0 
      ? 
      users.map(user => <div key={user.id}><p>{user.firstName}</p></div>) 
      : 
      <p style={{ color: 'whitesmoke' }}>No users found</p>
      }
    </div>
  )
}

export default Home