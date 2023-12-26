import React from 'react';
import './proyectos.css'; // Importa tu archivo de estilos (si no existe, créalo)
import { Link } from 'react-router-dom';

function Proyectos() {
  const changeImage = (element) => {
    element.classList.add('hovered');
  };

  const restoreImage = (element) => {
    element.classList.remove('hovered');
  };


  return (
    <div className="mt-4">

      <div className="row g-0">
        <div className="col-md-4">
          <Link to="/proyecto/1">
            <div className="card card-proyecto" onMouseOver={(e) => changeImage(e.target)} onMouseOut={(e) => restoreImage(e.target)}>
              <div className="image-container">
                <img
                  src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  className="card-img-top" alt="Proyecto 1" id="proyecto1"
                />
                <div className="image-text" id="text-proyecto1">Proyecto 1</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/proyecto/2">
            <div className="card card-proyecto">
              <img
                src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                className="card-img-top" alt="Proyecto 2" />
              <div className="image-text" id="text-proyecto1">Proyecto 2</div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/proyecto/3">
            <div className="card card-proyecto">
              <img
                src="https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                className="card-img-top" alt="Proyecto 3" />
              <div className="image-text" id="text-proyecto1">Proyecto 3</div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/proyecto/4">
            <div className="card card-proyecto">
              <img
                src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                className="card-img-top" alt="Proyecto 4" />
              <div className="image-text" id="text-proyecto1">Proyecto 4</div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/proyecto/5">
            <div className="card card-proyecto">
              <img
                src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80"
                className="card-img-top" alt="Proyecto 5" />
              <div className="image-text" id="text-proyecto1">Proyecto 5</div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/proyecto/6">
            <div className="card card-proyecto">
              <img
                src="https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                className="card-img-top" alt="Proyecto 6" />
              <div className="image-text" id="text-proyecto1">Proyecto 6</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Proyectos;

