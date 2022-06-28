/* importamos createContext y useState desde react */
import {createContext, useState} from 'react';


/* referenciamos AuthContext desde createContext({}) */
const AuthContext = createContext({});

/* children son los componentes que van a estar cuando se autentique */
export const AuthProvider = ({children}) =>{
    const [auth, setAuth] = useState({});

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

/* luego importamos el AuthProvider en el index.js */