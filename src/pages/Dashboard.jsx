import {useNavigate, Link} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';  
import Navigation from '../components/Navigation';

const Dashboard = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () =>{
    setAuth({});
    navigate('/login');
  }
  return (
    <>
      {<Navigation/>}
      <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard