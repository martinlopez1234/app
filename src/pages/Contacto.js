import React from 'react';

function Contacto() {
  return (
    <div className="container-fluid mt-5 d-flex">
      <div className="row flex-grow-1 w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center p-5">
          <h3>Información de Contacto</h3>
          <p>
            <strong>Dirección:</strong> Calle Ejemplo, Ciudad Ejemplo
          </p>
          <p>
            <strong>Teléfono:</strong> +123 456 789
          </p>
          <p>
            <strong>Correo Electrónico:</strong> info@example.com
          </p>

          <h3 className="mt-4">Horario de Atención</h3>
          <p>
            <strong>Lunes a Viernes:</strong> 9:00 AM - 6:00 PM
          </p>
          <p>
            <strong>Sábados:</strong> 10:00 AM - 2:00 PM
          </p>
          <p>
            <strong>Domingos:</strong> Cerrado
          </p>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center contacto-imagen">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Casa dibujada"
            loading="lazy"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Contacto;

