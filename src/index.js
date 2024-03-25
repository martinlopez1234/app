import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'jquery/dist/jquery.slim';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Nosotros from './Nosotros';
import Nabvar from './Nabvar';
import ProyectoDetalle from './ProyectoDetalle'; // Importa tu componente de detalle de proyecto
import Proyectos from './Proyectos';
import Contacto from './Contacto';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Nabvar />
      <Routes>
        <Route path="/" element={<Proyectos />} />
        <Route path="/App" element={<App />} />

        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
        <Route path="/Proyectos" element={<Proyectos />} />
        <Route path="/Contacto" element={<Contacto />} />
      </Routes>


    </Router>
  </React.StrictMode>,
);

reportWebVitals();
