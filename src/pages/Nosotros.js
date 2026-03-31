import React from 'react';

function Nosotros() {
  return (
    <div className=" ">
      <div className="card ">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Nuestra Empresa"
          className="img-fluid"
        />
      </div>

      <div className="container ">
        <div className="">
          <h3 className="text-center">NUESTRA OFICINA</h3>
          <p>
            Somos una empresa independiente de arquitectura y diseño interior con 30 años de experiencia
            desarrollando proyectos en los más diversos ámbitos de la arquitectura.
          </p>
          <p>
            Hemos participado en proyectos de vivienda en altura, viviendas unifamiliares, locales
            comerciales, sucursales bancarias, oficinas privadas y gubernamentales, edificios industriales,
            edificios de estacionamientos y establecimientos educacionales.
          </p>

          <p>
            Nuestro objetivo como oficina es poder acompañarte con el desarrollo de tus ideas y proyectos
            para hacerlos realidad.
          </p>
        </div>
      </div>

      <h3 className="text-center">EQUIPO</h3>
      <div className="container-fluid mb-4">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                className="card-img-top"
                alt="Miembro del equipo 1"
              />
              <div className="card-body">
                <h5 className="card-title">Fernando Nahum Morales</h5>
                <p className="card-text">Arquitecto socio</p>
                <p className="card-text">Diplomado en gestión inmobiliaria</p>
                <p className="card-text">Diplomado en derecho urbanístico</p>
                <p className="card-text">
                  Titulado de la Universidad Central de Chile el año 1996. Ha desarrollado su carrera profesional en
                  distintas oficinas de arquitectura e inmobiliarias como también de manera independiente.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                className="card-img-top"
                alt="Miembro del equipo 2"
              />
              <div className="card-body">
                <h5 className="card-title">Matias Nahum Zagal</h5>
                <p className="card-text">Arquitecto socio</p>
                <p className="card-text">
                  Titulado de la Universidad Mayor de Chile en el año 2023. Ha desarrollado destacados proyectos
                  universitarios nominados a concursos y trabajos independientes.
                </p>
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

