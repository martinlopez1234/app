
import { useParams } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';




const ProyectoDetalle = () => {
  const { id } = useParams();


  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);





  // Aquí podrías cargar la información del proyecto desde tu fuente de datos (API, estado local, etc.)
  // En este ejemplo, estoy utilizando un array de proyectos simulado
  const proyectos = [
    {
      id: 1,
      nombre: 'Conjunto Víctor Manuel',
      caracteristicas: <div class="container mt-4 ms-5">
        <div class="row">
          <div class="col-md-4">
            <p><strong>UBICACIÓN</strong><br />Chile</p>
          </div>
          <div class="col-md-4">
            <p><strong>CIUDAD</strong><br />Santiago</p>
          </div>
          <div class="col-md-4">
            <p><strong>AÑO</strong><br />2021</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <p><strong>ARQUITECTOS</strong><br />Ignacio Erazo, Nicolás Flores, Matías Nahum, Julio Pedrero</p>
          </div>
          <div class="col-md-4">
            <p><strong>CLIENTE</strong><br />Inversionistas particulares</p>
          </div>
          <div class="col-md-4">
            <p><strong>PROGRAMAS</strong><br />Vivienda</p>
          </div>
        </div>
        <div class="row">

          <div class="col-md-4">
            <p><strong>SUPERFICIE</strong><br />1.960 m2</p>
          </div>
          <div class="col-md-4">
            <p><strong>ESTADO</strong><br />Anteproyecto</p>
          </div>
        </div>
      </div>
      ,
      descripcion: 'Conjunto Víctor Manuel es un proyecto de vivienda construido sobre la ex curtiembre, en la cual en la actualidad se desarrolla el mercado de gran importancia en la conciencia popular en la ciudad de Santiago, el mercado persa Víctor Manuel. ',
      descripcionIMagen1: 'El proyecto se presentó con el desafío de conciliar vida doméstica dentro de un contexto histórico. Debido a esto, el conjunto busca intervenir lo menos posible en la estructura de la edificación antigua generando la suya propia alrededor de la existente. Esta se genera en base a una estructura metálica reticulada que envuelve la estructura de hormigón del Persa',
      imagen1: '/app/imgVictorManuel/Imagen 4.png',
      descripcionIMagen2: 'Su segundo nivel propone talleres versátiles que sirven como complemento a las actividades que se realizan en el Persa Víctor Manuel, disponibles tanto para sus habitantes como parta el público general.',
      imagen2: '/app/imgVictorManuel/Imagen 5.png',
      descripcionIMagen3: 'Finalmente las plantas de vivienda presentan dos tipos de viviendas, únicas y comunitarias, estas ultimas se encuentran en los ochavos del proyecto, disponiendo de habitaciones privadas y comedores conjuntos, donde los usuarios pueden compartir entre ellos.',
      imagen3: '/app/imgVictorManuel/Imagen 9.png',
      imagenCarrusel1: '/app/imgVictorManuel/Imagen 6.png',
      imagenCarrusel2: '/app/imgVictorManuel/Imagen 7.png',
      imagenCarrusel3: '/app/imgVictorManuel/Imagen 8.png',
      imagenCarrusel4: '/app/imgVictorManuel/Imagen 10.png',
      imagenCarrusel5: '/app/imgVictorManuel/Imagen 11.png',
      imagenCarrusel6: '/app/imgVictorManuel/Imagen 12.png',
      imagenCarrusel7: '/app/imgVictorManuel/Imagen 13.png',
      imagenCarrusel8: '/app/imgVictorManuel/Imagen 14.png',

      imagen: '/app/imgVictorManuel/Imagen 1.png',
    },

    {
      id: 2,
      nombre: 'NUA - Núcleo Urbano Algarrobo',
      caracteristicas: <div class="container mt-4 ms-5">
        <div class="row">
          <div class="col-md-4">
            <p><strong>UBICACIÓN</strong><br />Chile</p>
          </div>
          <div class="col-md-4">
            <p><strong>CIUDAD</strong><br />Santiago</p>
          </div>
          <div class="col-md-4">
            <p><strong>AÑO</strong><br />2023</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <p><strong>ARQUITECTO</strong><br />Matías Nahum</p>
          </div>
          <div class="col-md-4">
            <p><strong>CLIENTE</strong><br />Inversionistas particulares</p>
          </div>
          <div class="col-md-4">
            <p><strong>PROGRAMAS</strong><br />Oficinas, Comercio, Cultural</p>
          </div>
        </div>
        <div class="row">

          <div class="col-md-4">
            <p><strong>SUPERFICIE</strong><br />1.886 m2</p>
          </div>
          <div class="col-md-4">
            <p><strong>ESTADO</strong><br />Anteproyecto</p>
          </div>
        </div>
      </div>
      ,
      descripcion: <p>Durante la pandemia del Coronavirus, la población experimentó un cambio radical en su forma de vida. El encierro y la imposibilidad de ir a trabajar, dio lugar al teletrabajo, una forma de trabajar a distancia donde el usuario podía realizar sus actividades laborales desde su casa. Esto conllevó a una falta de actividad social, provocando un desgaste emocional y económico en las personas, generando de esta manera, una migración de las grandes ciudades.<br /><br />Este proyecto se centra en una de las localidades afectadas por la migración, la comuna de Algarrobo, ubicada en la Región de Valparaíso. Ésta presentó un auge en su población durante los años de pandemia, aumentando la demanda de espacios laborales. Debido a este crecimiento y a la llegada de nuevos habitantes a la zona, la demanda comercial y cultural se vio afectada de igual manera. <p>
      </p></p>

      ,
      descripcionIMagen1: 'El proyecto se presentó con el desafío de conciliar vida doméstica dentro de un contexto histórico.Debido a esto, el conjunto busca intervenir lo menos posible en la estructura de la edificación antigua generando la suya propia alrededor de la existente.Esta se genera en base a una estructura metálica reticulada que envuelve la estructura de hormigón del Persa',
      imagen1: '/app/imgNUA/Imagen 2.png',
      descripcionIMagen2: 'NUA distribuye sus diferentes programas a lo largo de tres plantas. En primer lugar, un nivel subterráneo destinado principalmente a las actividades del teatro, generándolas de manera soterrada como forma de disminuir el impacto auditivo dentro de los diferentes programas y recintos del proyecto. Este logra generar un espacio adecuado para las actividades de Algarrobo, resolviendo de esta manera la carencia de zonas culturales que se generaron durante la pandemia.',
      imagen2: '/app/imgNUA/Imagen 17.png',
      descripcionIMagen3: 'El primer nivel, debido a que es un área pública, quedará destinada a los programas de ferias y locales comerciales. Este plantea una estrategia de circulaciones continuas y fluidas a su vez de generar una transparencia visual que permite conectar ambas vías principales dentro del proyecto. Del mismo modo, NUA busca relacionarse con su contexto, generando una proyección de los volúmenes de la primera planta hacia norte y sur, permitiendo que el proyecto sea uno más con sus circulaciones principales.',
      imagen3: '/app/imgNUA/Imagen 3.png',
      descripcionIMagen4: 'La segunda planta, destinada al uso del CoWork, propone un espacio colaborativo y creativo para sus usuarios, generando diferentes áreas de trabajo variadas dependiendo del uso que se le quiera dar. Dispone de puestos de trabajo flexible, oficinas privadas, salas de reuniones, área de esparcimiento, cafetería y una pequeña zona de ploteo. Todo este nivel se plantea con una vista panorámica hacia la playa de Algarrobo la cual se protege del asoleamiento norte mediante celosías de madera dispuestas para cuidar los espacios de la luz directa del sol. Estas se proyectan con un ritmo diferente en la fachada sur para así brindar de privacidad a la zona de oficinas privadas del proyecto. Finalmente, se proponen vacíos en la planta para así iluminar y ventilar de forma natural el proyecto, buscando siempre generar un confort adecuado para sus usuarios.',
      imagen4: '/app/imgNUA/Imagen 11.png',

      imagenCarrusel1: '/app/imgNUA/Imagen 6.png',
      imagenCarrusel2: '/app/imgNUA/Imagen 7.png',
      imagenCarrusel3: '/app/imgNUA/Imagen 8.png',
      imagenCarrusel4: '/app/imgNUA/Imagen 10.png',
      imagenCarrusel5: '/app/imgNUA/Imagen 18.png',
      imagenCarrusel6: '/app/imgNUA/Imagen 19.png',
      imagenCarrusel7: '/app/imgNUA/Imagen 23.png',
      imagenCarrusel8: '/app/imgNUA/Imagen 31.png',


      imagen: '/app/imgNUA/Imagen 1.png'
    },

    {
      id: 3,
      nombre: 'Paralelos Matta Sur',
      caracteristicas: <div class="container mt-4 ms-5">
        <div class="row">
          <div class="col-md-4">
            <p><strong>UBICACIÓN</strong><br />Chile</p>
          </div>
          <div class="col-md-4">
            <p><strong>CIUDAD</strong><br />Santiago</p>
          </div>
          <div class="col-md-4">
            <p><strong>AÑO</strong><br />2021</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <p><strong>ARQUITECTOS</strong><br />Ignacio Erazo, Nicolás Flores, Matías Nahum, Julio Pedrero</p>
          </div>
          <div class="col-md-4">
            <p><strong>CLIENTE</strong><br />Concurso CORMA</p>
          </div>
          <div class="col-md-4">
            <p><strong>PROGRAMAS</strong><br />Comercio, Vivienda</p>
          </div>
        </div>
        <div class="row">

          <div class="col-md-4">
            <p><strong>SUPERFICIE</strong><br />5.150 m2</p>
          </div>
          <div class="col-md-4">
            <p><strong>ESTADO</strong><br />Anteproyecto</p>
          </div>
        </div>
      </div>
      ,
      descripcion: 'Paralelos Matta Sur se presenta como un proyecto de viviendas y comercio construido en madera, buscando generar un punto de encuentro entre la comunidad y sus residentes. La estrategia base se propone mediante el uso de un módulo con el fin de conciliar vida domestica y trabajo en un solo lugar. ',
      descripcionIMagen1: 'En su primera y segunda planta se concentran programas de uso público, generando locales comerciales y auditorios al aire libre para las actividades de la comunidad, la cuales buscan ser un espacio comunitario que potencie las interacciones de sus usuarios. Su segundo nivel destaca por las pasarelas de hormigón armado que conectan ambas torres, generando esta unión del proyecto en su totalidad.',
      imagen1: '/app/imgPMS/Imagen 9.png',
      descripcionIMagen2: 'Las plantas habitacionales se organizan en base a módulos de 3 x 4 metros, distribuyendo eficientemente las relaciones dentro de las viviendas. Paralelos Matta Sur presenta diferentes tipologías habitables. Por una parte, de diseñan tres tipologías de entre 24 y 48 m2, cada una destinada a diferentes usuarios como estudiantes solitarios, parejas sin hijos o un módulo exclusivamente para el trabajo.',
      imagen2: '/app/imgPMS/Imagen 3.png',
      descripcionIMagen3: 'A su vez, se disponen dos tipologías de dúplex de 72 y 96 m2 enfocadas en ser espacios flexibles para familias de tres a cuatro personas caracterizándose por tener espacios modulares adaptables que favorecen la vida en familia y permiten el acceso en dos niveles a la calle elevada del proyecto.',
      imagen3: '/app/imgPMS/Imagen 6.png',
      descripcionIMagen4: 'Las viviendas más grandes de 72 y 96 m2, además de disponer de mas espacio de terraza, permiten generar vida y trabajo en un solo lugar. Estas viviendas contemplan zonas de trabajo in situ con el fin de presentar a sus usuarios un espacio privado para ellos sin necesidad de compartir los módulos de trabajo vistos anteriormente con otros habitantes.',

      imagen4: '/app/imgPMS/Imagen 5.png',
      descripcionIMagen5: 'Paralelos Matta Sur pretende no solo generar viviendas que combinen hogar y trabajo en una misma zona, sino que también promover un espacio comunitario al aire libre. Su cubierta conformada por pilares y diagonales de madera permite generar espacios de permanencia y cosecha, a la vez de disponer telas a modo de generar protección directa de los rayos del sol a esta área.',
      imagen5: '/app/imgPMS/Imagen 7.png',
      imagenCarrusel1: '/app/imgPMS/Imagen 4.png',
      imagenCarrusel2: '/app/imgPMS/Imagen 8.png',
      imagenCarrusel3: '/app/imgPMS/Imagen 1.png',
      imagenCarrusel4: '/app/imgPMS/Imagen 7.png',
      imagenCarrusel5: '/app/imgPMS/Imagen 25.png',
      imagenCarrusel6: '/app/imgPMS/Imagen 15.png',
      imagenCarrusel7: '/app/imgPMS/Imagen 29.png',
      imagenCarrusel8: '/app/imgPMS/Imagen 27.png',

      imagen: '/app/imgPMS/Imagen 2.png',
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

  const images = [
    proyecto.imagenCarrusel1,
    proyecto.imagenCarrusel2,
    proyecto.imagenCarrusel3,
    proyecto.imagenCarrusel4,
    proyecto.imagenCarrusel5,
    proyecto.imagenCarrusel6,
    proyecto.imagenCarrusel7,
    proyecto.imagenCarrusel8,



  ];

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,  // 4 imágenes por fila
    slidesToScroll: 4, // Scroll de 4 en 4
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,  // 3 imágenes por fila para pantallas medianas
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,  // 2 imágenes por fila para pantallas pequeñas
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,  // 1 imagen por fila para pantallas muy pequeñas
          slidesToScroll: 1
        }
      }
    ]
  };

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

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
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Ajusta la opacidad y color de fondo
            color: 'white', // Ajusta el color del texto
          }}
        >
          <h2>{proyecto.nombre}</h2>
        </div>

      </div>
      <div className='container mt-5'>

        <h5>{proyecto.caracteristicas}</h5>
      </div>
      <div className='container mt-5
'>
        <h5>
          {proyecto.descripcion}</h5>
      </div>

      <div class=" mt-5 ">
        <div class="row ">
          <div class="col-md-4 order-md-1 order-2 ">
            <div className='ms-3 text-justify container'>
              <h5>
                {proyecto.descripcionIMagen1}
              </h5>

            </div>
          </div >
          <div className="col-md-8 order-md-3 order-1">
            <img
              src={proyecto.imagen1}
              className="img-fluid"

              alt="Imagen"
            />
          </div>

        </div >



      </div >

      <div class=" mt-1">
        <div class="row">
          <div class="col-md-8 order-md-1 order-1">
            <img src={proyecto.imagen2} class="img-fluid" alt="Imagen" />
          </div>
          <div class="col-md-4 order-md-2 order-2">
            <div className='text-justify container'>
              <h5>
                {proyecto.descripcionIMagen2}
              </h5>
            </div>
          </div>
        </div>
      </div>




      <div class=" mt-1 ">
        <div class="row ">
          <div class="col-md-4 order-md-1 order-2 ">
            <div className='ms-3 text-justify container'>
              <h5>
                {proyecto.descripcionIMagen3}
              </h5>

            </div>
          </div>
          <div className="col-md-8 order-md-3 order-1">
            <img
              src={proyecto.imagen3}
              className="img-fluid"

              alt="Imagen"
            />
          </div>

        </div>

      </div>


      {
        proyecto.imagen4 && proyecto.descripcionIMagen4 && (
          <div className="mt-1">
            <div className="row">
              <div className="col-md-8 order-md-1 order-1">
                <img src={proyecto.imagen4} className="img-fluid" alt="Imagen" />
              </div>
              <div className="col-md-4 order-md-2 order-2">
                <div className="text-justify container">
                  <h5>{proyecto.descripcionIMagen4}</h5>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {
        proyecto.imagen5 && proyecto.descripcionIMagen5 && (

          <div class=" mt-1 ">
            <div class="row ">
              <div class="col-md-4 order-md-1 order-2 ">
                <div className='ms-3 text-justify container'>
                  <h5>
                    {proyecto.descripcionIMagen5}
                  </h5>

                </div>
              </div>
              <div className="col-md-8 order-md-3 order-1">
                <img
                  src={proyecto.imagen5}
                  className="img-fluid"

                  alt="Imagen"
                />
              </div>

            </div>

          </div>
        )
      }

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <h2>Galería</h2>
          </div>
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index} onClick={() => openLightbox(index)} className="p-2">
                <img src={img} alt={`Slide ${index}`} style={{ width: '100%', cursor: 'pointer' }} />
              </div>
            ))}
          </Slider>

          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % images.length)
              }
            />
          )}
        </div>
      </div>
    </div>



  );
};

export default ProyectoDetalle;
