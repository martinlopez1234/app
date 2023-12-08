import React from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from 'react-bootstrap';
import './App.css';

function App() {
  const images = [
    'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1661103517104-9d118ccad126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1550567844-b7cd4e881301?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (

    <div className="">

      <Carousel controls={false} indicators={false}  >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block "
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="card-img-overlay d-flex align-items-center ms-3 mt-5">
        <div>
          <h1 className="card-title text-white">CREAMOS LUGARES FELICES</h1>
          <p className="card-text text-white">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
          </p>

        </div>
        <div>
          <Link
            className="btn card-img-overlay text-white"
            to="/Proyectos"
            style={{ marginTop: "650px", color: "white", transition: "color 0.3s" }}
            onMouseOver={(e) => e.target.style.color = "gray"}
            onMouseOut={(e) => e.target.style.color = "white"}
          >
            <h4>Ver Más</h4>
          </Link>
        </div>
      </div>
    </div >
  );
}

export default App;
