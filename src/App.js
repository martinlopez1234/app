import React from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from 'react-bootstrap';
import './App.css';


function App() {
  const images = [
    '/app/imgNUA/Imagen 1.png',
    '/app/imgPMS/Imagen 2.png',
    '/app/imgVictorManuel/Imagen 2.png',
  ];

  return (

    <div className="home-container">

      <div className="" >
        <Carousel controls={false} indicators={false}>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                style={{
                  objectFit: 'cover',
                  height: (window.innerWidth > 1024 && window.innerWidth <= 1366) ? '80vh' : // Si el ancho de la ventana está entre 1024px y 1366px (pantallas de notebook), usa 80vh
                    (window.innerWidth > 768 ? '100vh' : '110vh'), // Si la ventana es más ancha que 768px (pantallas de PC), usa 94.2vh; de lo contrario, usa 100vh (teléfonos).
                  width: '100%',
                }}
                className="d-block img-fluid"
                src={image}
                alt={`Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>



        <div className="card-img-overlay d-flex align-items-center ms-3 mt-5" >
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
              style={{ marginTop: "820px", color: "white", transition: "color 0.3s", border: "none" }}
              onMouseOver={(e) => e.target.style.color = "gray"}
              onMouseOut={(e) => e.target.style.color = "white"}
            >
              <h4>Nuestros Proyectos</h4>
            </Link>
          </div>
        </div>
      </div >
    </div>
  );
}

export default App;
