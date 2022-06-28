import {Routes, Route} from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import RequireAuth from '../components/RequireAuth';
import Account from '../pages/Account';
import Alumnos from '../pages/Alumnos';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NoEncontrada from '../pages/NoEncontrada';
import Register from '../pages/Register';
import Registro from '../pages/Registro';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
            {/* Rutas publicas */}
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>

            {/* Rutas privadas */}
            <Route element={<RequireAuth/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="alumnos" element={<Alumnos/>}/>
            <Route path="registro" element={<Registro/>}/>
            <Route path="cuenta" element={<Account/>}/>
            </Route>

            {/* ruta no econtrada */}
            <Route path="*" element={<NoEncontrada/>}/>
      </Route>
    </Routes>
  );
}

export default AppRouter;