import React from 'react';
import { useParams } from 'react-router-dom';

const ProyectoDetalle = () => {
  const { id } = useParams();

  // Aquí podrías cargar la información del proyecto desde tu fuente de datos (API, estado local, etc.)
  // En este ejemplo, estoy utilizando un array de proyectos simulado
  const proyectos = [
    {
      id: 1,
      nombre: 'Proyecto 1',
      descripcion: 'Descripción del Proyecto 1...',
      imagen: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },

    {
      id: 2,
      nombre: 'Proyecto 2',
      descripcion: 'Descripción del Proyecto 2...',
      imagen: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    },

    {
      id: 3,
      nombre: 'Proyecto 3',
      descripcion: 'Descripción del Proyecto 3...',
      imagen: 'https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },

    {
      id: 4,
      nombre: 'Proyecto 4',
      descripcion: 'Descripción del Proyecto 4...',
      imagen: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },

    {
      id: 5,
      nombre: 'Proyecto 5',
      descripcion: 'Descripción del Proyecto 5...',
      imagen: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
    },

    {
      id: 6,
      nombre: 'Proyecto 6',
      descripcion: 'Descripción del Proyecto 6...',
      imagen: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    // Agrega más proyectos según sea necesario
  ];

  const proyecto = proyectos.find((p) => p.id === parseInt(id, 10));

  if (!proyecto) {
    return <center><h1 >Proyecto no encontrado</h1></center>
  }

  return (
    <div>


      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <img
          src={proyecto.imagen}
          alt={proyecto.nombre}
          style={{ width: '100%', height: 'auto' }} // Ajusta el tamaño de la imagen
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajusta la opacidad y color de fondo
            color: 'white', // Ajusta el color del texto
          }}
        >
          <h2>{proyecto.nombre}</h2>
        </div>

      </div>
      <div className='container mt-5'>
        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat rem ea minus consectetur. Necessitatibus deserunt amet eius quis vel, cumque aspernatur praesentium, officiis molestiae esse repellendus pariatur qui expedita! Voluptate.

        </h3>
        <h3>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat rem ea minus consectetur. Necessitatibus deserunt amet eius quis vel, cumque aspernatur praesentium, officiis molestiae esse repellendus pariatur qui expedita! Voluptate.</h3>
      </div>
    </div>
  );
};

export default ProyectoDetalle;
