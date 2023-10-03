import { Button } from "bootstrap";

function Nosotros() {
  return (

    <div class="container mt-5 " style={{
      marginBottom: '70px'
    }}>

      <div class="row">

        <div class="col-md-6">
          <h3>Nuestra Empresa</h3>
          <p>Somos una empresa de arquitectura dedicada a la creación de espacios inspiradores y funcionales. Nuestra
            misión
            es transformar tus ideas en proyectos arquitectónicos reales que superen tus expectativas.</p>
          <p>Desde nuestra fundación, hemos completado con éxito una amplia gama de proyectos, desde viviendas
            residenciales
            hasta edificios comerciales. Nuestro equipo de arquitectos altamente capacitados trabaja en estrecha
            colaboración contigo para lograr resultados excepcionales.</p>
        </div>
        <div class="col-md-4">

          <img
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80"
            alt="Nuestra Empresa" class="img-fluid" />
        </div>
      </div>

      <h3 class="mt-5">Nuestro Equipo</h3>
      <div class="row">
        <div class="col-md-4">

          <div class="card mb-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              class="card-img-top" alt="Miembro del equipo 1" />
            <div class="card-body">
              <h5 class="card-title">Nombre del Miembro</h5>
              <p class="card-text">Arquitecto Principal</p>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius, felis eget
                dapibus euismod, urna libero ullamcorper justo.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              class="card-img-top" alt="Miembro del equipo 2" />
            <div class="card-body">
              <h5 class="card-title">Nombre del Miembro</h5>
              <p class="card-text">Diseñador de Interiores</p>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius, felis eget
                dapibus euismod, urna libero ullamcorper justo.</p>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}

export default Nosotros;
