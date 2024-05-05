import React, {useContext, useState} from 'react';
import { UsersContext } from '../../Context';
import axios from 'axios';


const Main = () => {
  const {users, setUsers} = useContext(UsersContext)

  const fetchApi = async () => {
    const response = await axios.get<{ users: string[] }>("http://localhost:8080/users");
    console.log(response.data.users)
    setUsers(response.data.users)
  }

    /*
  useEffect(() => {
    fetchApi()
  }, [])
    */
  
  return (
    <main id='app-main'>
      {users.map((user, index) => <p key={index}>{user}</p>)}
    </main>
  )
}

export default Main