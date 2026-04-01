import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';

import '../styles/Nabvar.css'; // Mantiene tu CSS

function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={process.env.PUBLIC_URL + '/LogoNHM3.png'}
              alt="Mi Imagen"
              style={{ width: '94px', height: '72px' }}
            />
          </Link>

          <Button
            className="navbar-toggler"
            style={{ marginRight: '25px', backgroundColor: 'rgb(25, 27, 65)' }}
            variant="light"
            onClick={handleShow}
          >
            <span className="navbar-toggler-icon"></span>
          </Button>

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/Nosotros" onClick={handleClose}>
                    Nosotros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Proyectos" onClick={handleClose}>
                    Proyectos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Contacto" onClick={handleClose}>
                    Contacto
                  </Link>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

