import React from 'react';

function Nosotros() {
  return (
    <div className=" ">

      <div class="card ">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Nuestra Empresa"
          className="img-fluid"
        />

      </div>


      <div className="container ">
        <div className="">
          <h3 className='text-center'>Nuestra Empresa</h3>
          <p>Somos una empresa de arquitectura dedicada a la creación de espacios inspiradores y funcionales. Nuestra misión es transformar tus ideas en proyectos arquitectónicos reales que superen tus expectativas.</p>
          <p>Desde nuestra fundación, hemos completado con éxito una amplia gama de proyectos, desde viviendas residenciales hasta edificios comerciales. Nuestro equipo de arquitectos altamente capacitados trabaja en estrecha colaboración contigo para lograr resultados excepcionales.</p>
        </div>
      </div>

      <h3 className="text-center">Nuestro Equipo</h3>
      <div className="container-fluid mb-4">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="card-img-top" alt="Miembro del equipo 1" />
              <div className="card-body">
                <h5 className="card-title">Nombre del Miembro</h5>
                <p className="card-text">Arquitecto Principal</p>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius, felis eget dapibus euismod, urna libero ullamcorper justo.</p>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" className="card-img-top" alt="Miembro del equipo 2" />
              <div className="card-body">
                <h5 className="card-title">Nombre del Miembro</h5>
                <p className="card-text">Diseñador de Interiores</p>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius, felis eget dapibus euismod, urna libero ullamcorper justo.</p>
              </div>
            </div>
          </div>

          {/* Puedes agregar más tarjetas aquí según sea necesario */}
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
