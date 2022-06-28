/* importamos los estilos */
import './registerandlogin.css'
/* importamos useRef, useState, useEffect desde react  */
import { useRef, useState, useEffect } from "react" 

/* importaciones de fontawesome, fortawesome PREVIAMENTE DEBO INSTALARLAS CON 
            npm i --save @fortawesome/fontawesome-svg-core
            npm install --save @fortawesome/free-solid-svg-icons
            npm install --save @fortawesome/react-fontawesome
 */

import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* importamos axios.js de la carpeta api en src*/
import axios from '../api/axios';
import { Link, NavLink } from 'react-router-dom';

/* declaramos las expresiones regulares para las validaciones del user y del password */
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

/* URL de registro */
const REGISTER_URL = '/api/v1/auth/register';

const Register = () => {
  /* nos prermite enfocarnos en la entrada del usuario cuando se cargue el componente */
  const userRef = useRef();
  /* si recibimos un error debemos enfocarnos en eso para que pueda anunciarse por un lector de pantalla para la accesibilidad */
  const errRef = useRef();

  /* estados del componente */
  /* user */
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  /* password */
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  /* confirm password */
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  /* error message */
  const [errMsg, setErrMsg] = useState('');

  /* éxito */
  const [success, setSuccess] = useState(false);

  /* los useEffects */
  /* cuando el componente se carga*/
  useEffect(() => {
    /* establecerá el enfoque en el user cuando el componente se cargue */
    userRef.current.focus();
  }, []);

  /* este useEffect se aplica al user */
  useEffect(() => {
    const result = USER_REGEX.test(user); // devuelve true o false
    setValidName(result)
  }, [user]);

  /* este useEffect es para el password y el confirm password */
  /* lo bueno de tener ambos dentro del mismo useEffect, es que cada vez
  que uno de ellos cambia, la coincidencia válida también verificará si cambiamos
  ese campo o contraseña y eso le permite estar sincronizado con el campo de contraseña en todo 
  momento, por lo que tiene una contraseña y una contraseña coincidente en el array de coincidencia*/
  useEffect(() => {
    const result = PWD_REGEX.test(pwd); // devuelve true o false
    setValidPwd(result);
    const match = pwd === matchPwd; // devuelve true o false
    setValidMatch(match);
  }, [pwd, matchPwd]);

  /* este useEffect es para el mensaje de error */
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  /* handleSubmit */

  const handleSubmit = async (e) =>{
    e.preventDefault();
    //if button enabled with js hack

    console.log(user, pwd)

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2){
        setErrMsg("Invalid Entry");
        return;
    } 

    try {       
        const response = await axios.post(REGISTER_URL,
            JSON.stringify({ username: user, password:pwd, repassword: pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        console.log(response.data);
        /* console.log(response.token);
        console.log(JSON.stringify(response)); */
        setSuccess(true);
        
        //limpiar los campos del formulario

    } catch (error) {
        if(!error?.response){
            setErrMsg('No hay respuesta del servidor')
        } else if(error.response?.satatus === 409){
            setErrMsg('Username token');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
    }
  }

  return (
    <>
    {
        success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link as={NavLink} to="/login">Sign In</Link>
                    </p>
                </section>
                ) : (
                    <section>
                        {/* párrafo que se mostrará en la parte superior del formulario */}
                        <p
                            ref={errRef}
                            aria-live="assertive" 
                            className={errMsg ? "errMsg" : "offscreen"}
                        >{errMsg}</p>
                        <h1>Registro</h1>
                        <form onSubmit={handleSubmit}>
                            {/* username */}
                            <label htmlFor="username">
                                Username: 
                                {/* check(verde) o x(rojo) */}
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validName || !user ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input 
                                type="text"
                                id="username"
                                value={user}
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e)=>setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={()=>setUserFocus(true)}
                                onBlur={()=>setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                4 to 24 characters.<br/>
                                Must begin with a letter.<br/>
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            {/* password */}
                            <label htmlFor="password">
                                Password: 
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input 
                                type="password"
                                id="password"
                                value={pwd} 
                                onChange={(e)=>setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={()=>setPwdFocus(true)}
                                onBlur={()=>setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 a 24 caracteres.<br/>
                                Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial. <br/>
                                Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span>
                                <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                                <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirm Password: 
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>

                            <input 
                                type="password"
                                id="confirm_pwd"
                                value={matchPwd}
                                onChange={(e)=>setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={()=>setMatchFocus(true)}
                                onBlur={()=>setMatchFocus(false)} 
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Must match the first password input field.
                            </p>

                            {/* si validName no tiene un nombre válido
                                si validPwd no tiene una contraseña válida
                                si validMatch no tiene una coincidencia válida que el disabled sea true y si traen valor que el
                            disabled sea false */}
                            <button disabled={!validName || !validPwd || !validMatch ? true : false} className='mt-3 btn btn-outline-success'>
                                Regístrate
                            </button>
                            <p>
                                Ya estás registrado? <br/>
                                <span className="line">
                                    <Link as={NavLink} to="/login">Inicia Sesión</Link>
                                </span>
                            </p>
                        </form>
                    </section>
                )
    }
    </>
  )
}

export default Register