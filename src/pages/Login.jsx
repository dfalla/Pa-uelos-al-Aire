/* importamos los estilos */
import './registerandlogin.css'

/* importamos los hooks useRef, useState, useEffect, useContext */
import {useRef, useState, useEffect} from 'react';

/* importamos Link, useNavigate, useLocation desde react-router-dom */

import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';

/* importamos el useAuth */
import useAuth from '../hooks/useAuth';

/* importamos axios.js de la carpeta api en src*/
import axios from '../api/axios';

const LOGIN_URL = '/api/v1/auth/login';

const Login = () => {

const {setAuth} = useAuth();

const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname || "/";

/* nos prermite enfocarnos en la entrada del usuario cuando se cargue el componente */
const userRef = useRef();

/* si recibimos un error debemos enfocarnos en eso para que pueda anunciarse por un lector de pantalla para la accesibilidad */
const errRef = useRef();

/* estados del componente */
/* user */
const [user, setUser] = useState('');

/* password */
const [pwd, setPwd] = useState('');

/* mensaje de error */
const [errMsg, setErrMsg] = useState('');

/* éxito */
/* const [success, setSuccess] = useState(false); */

/* los useEffects */
/* cuando el componente se carga*/
useEffect(() => {
    /* establecerá el enfoque en el user cuando el componente se cargue */
    userRef.current.focus();
}, []);

useEffect(() => {
    setErrMsg('');
}, [user, pwd]);

const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({username: user, password: pwd}),
            {
                headers: {'Content-Type': 'application/json'},
            });
        console.log(response.data);
        const accessToken = response?.data?.token;
        const roles = response?.data?.roles;

        /* almancenamos el user, pwd, roles, accessToken en el contexto global */
        setAuth({user, pwd, roles, accessToken});
        setUser('');
        setPwd('');
        navigate(from, { replace: true })
    }catch(err){
        if(!err?.response){
            setErrMsg('No hay respuesta del servidor');
        } else if(err.response?.status === 400){
            setErrMsg('Usuario o contraseña incorrecta')
        } else if(err.response?.status === 401){
            setErrMsg('No autorizado');
        } else {
            setErrMsg('Inicio de sesión fallida');
        }

        errRef.current.focus();
    }
}

return (
   <> 
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Inicie Sesión</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username"
                    /* establecer el foco en el campo del username */
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=> setUser(e.target.value)}
                    value={user}
                    required 
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e)=> setPwd(e.target.value)}
                    value={pwd}
                    required 
                />
                    <button className='mt-3 btn btn-outline-success'>Iniciar Sesión</button>
            </form>
            <p>
                Necesita una cuenta? <br/>
                <span className='line'>
                    <Link to="/register">Registrarse</Link>
                </span>
            </p>
        </section>
   </>
)
}

export default Login