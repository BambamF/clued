import React, {useContext} from 'react';
import { UsersContext } from '../../Context';
import axios from 'axios';
import './Home.css';

const Home = () => {
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
    <div id='home-wrapper'>
        {users.map((user, index) => <p key={index}>{user}</p>)}
    </div>
  )
}

export default Home