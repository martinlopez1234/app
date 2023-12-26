import React from 'react';
import { Link } from 'react-router-dom';



function Nabvar() {
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid">
        <Link className="nav-link" to="/App">LOGO EMPRESA</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">

              <Link className="nav-link" to="/Nosotros">Nosotros</Link>

            </li>
            <li className="nav-item">


              <Link className="nav-link" to="/Proyectos">Proyectos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Nabvar;
