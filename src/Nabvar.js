import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Nabvar.css'; // Importa tu archivo de estilos CSS

import { Button } from 'react-bootstrap';



function Navbar() {



  return (
    <div className="nav-wrapper">
      <nav className="navbar  ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/App">
            <img
              src={process.env.PUBLIC_URL + '/LogoNHM3.png'}
              alt="Mi Imagen"
              style={{ width: '94px', height: '72px' }}
            />
          </Link>




          <Button
            className="navbar-toggler "
            style={{ marginRight: "25px", backgroundColor: 'rgb(25, 27, 65)' }}
            variant="light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"  ></span>
          </Button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/Nosotros">
                    Nosotros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Proyectos">
                    Proyectos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Contacto">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav >
    </div >
  );
}

export default Navbar;
