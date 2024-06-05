import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {

  return (
        <div id='layout-wrapper'>
          <Navbar/>
          <Outlet/>
        </div>
  )
}

export default Layout