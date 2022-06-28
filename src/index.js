import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
/* importamos el AuthProvider*/


/* importamos BrowserRouter, Routes, Route */
/* import {BrowserRouter, Routes, Route} from 'react-router-dom'; */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

