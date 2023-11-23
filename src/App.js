import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1550567844-b7cd4e881301?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 6000); // Ajusta el tiempo de transición según tus preferencias

    return () => clearInterval(intervalId);
  }, [images.length]);

  const backgroundImageStyle = {
    backgroundImage: `url(${images[currentImage]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '915px',
    width: '100%',
    transition: 'background-image 4s ease-in-out', // Ajusta la duración y la función de temporización
  };



  return (
    <div className="">
      <div className="card bg-dark text-white" style={{ position: 'relative' }}>
        <div className="card-img" style={backgroundImageStyle}></div>
        <div className="card-img-overlay d-flex align-items-center">
          <div>
            <h1 className="card-title">CREAMOS LUGARES FELICES</h1>
            <p className="card-text">

              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.


            </p>
            <Link className=" btn btn-success
" to="/Proyectos">Ver Mas</Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
