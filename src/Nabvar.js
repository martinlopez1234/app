import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nosotros from './Nosotros';

function Nabvar() {
  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <Link className="nav-link" to="/App">LOGO EMPRESA</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">

              <Link className="nav-link" to="/Nosotros">Nosotros</Link>

            </li>
            <li class="nav-item">


              <Link className="nav-link" to="/Proyectos">Proyectos</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/Contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Nabvar;
