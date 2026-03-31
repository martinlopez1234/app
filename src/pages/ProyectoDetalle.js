import { useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';

import '../styles/App.css';
import { supabase } from '../lib/supabaseClient';

function ProyectoDetalle() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [proyecto, setProyecto] = useState(null);
  const [features, setFeatures] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const projectId = useMemo(() => {
    const parsed = parseInt(id, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        if (!supabase) {
          throw new Error(
            'Supabase no configurado. Agrega `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_ANON_KEY` en un archivo `.env`.'
          );
        }

        setLoading(true);
        setError(null);
        setProyecto(null);
        setFeatures([]);
        setGalleryImages([]);
        setIsOpen(false);
        setPhotoIndex(0);

        if (!projectId) {
          throw new Error('ID de proyecto inválido.');
        }

        const { data: project, error: projectError } = await supabase
          .from('projects')
          .select('id, nombre, cover_image_url, caracteristicas_html, descripcion_html')
          .eq('id', projectId)
          .eq('published', true)
          .maybeSingle();

        if (projectError) throw projectError;
        if (!project) {
          if (!isMounted) return;
          setProyecto(null);
          setLoading(false);
          return;
        }

        const { data: featureImages, error: featureError } = await supabase
          .from('project_images')
          .select('slot, image_url, descripcion_html')
          .eq('project_id', projectId)
          .eq('kind', 'feature')
          .order('slot', { ascending: true });

        if (featureError) throw featureError;

        const { data: galleryData, error: galleryError } = await supabase
          .from('project_images')
          .select('image_url')
          .eq('project_id', projectId)
          .eq('kind', 'gallery')
          .order('orden', { ascending: true });

        if (galleryError) throw galleryError;

        if (!isMounted) return;

        setProyecto({
          id: project.id,
          nombre: project.nombre,
          imagen: project.cover_image_url,
          caracteristicas_html: project.caracteristicas_html,
          descripcion_html: project.descripcion_html,
        });

        setFeatures(featureImages || []);
        setGalleryImages((galleryData || []).map((g) => g.image_url).filter(Boolean));
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || String(err));
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const getFeature = (slot) => features.find((f) => f.slot === slot) || null;

  const feature1 = getFeature(1);
  const feature2 = getFeature(2);
  const feature3 = getFeature(3);
  const feature4 = getFeature(4);
  const feature5 = getFeature(5);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = galleryImages;

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  if (loading) {
    return (
      <center>
        <h1>Cargando proyecto...</h1>
      </center>
    );
  }

  if (error) {
    return (
      <center>
        <h1>{error}</h1>
      </center>
    );
  }

  if (!proyecto) {
    return (
      <center>
        <h1>Proyecto no encontrado</h1>
      </center>
    );
  }

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <img src={proyecto.imagen} alt={proyecto.nombre} style={{ width: '100%', height: 'auto' }} />
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white',
          }}
        >
          <h2>{proyecto.nombre}</h2>
        </div>
      </div>

      <div className="container mt-5">
        <h5 dangerouslySetInnerHTML={{ __html: proyecto.caracteristicas_html || '' }} />
      </div>

      <div className="container mt-5">
        <h5 dangerouslySetInnerHTML={{ __html: proyecto.descripcion_html || '' }} />
      </div>

      {feature1?.image_url && (
        <div className=" mt-5 ">
          <div className="row ">
            <div className="col-md-4 order-md-1 order-2 ">
              <div className="ms-3 text-justify container">
                <h5 dangerouslySetInnerHTML={{ __html: feature1.descripcion_html || '' }} />
              </div>
            </div>
            <div className="col-md-8 order-md-3 order-1">
              <img src={feature1.image_url} className="img-fluid" alt="Imagen" />
            </div>
          </div>
        </div>
      )}

      {feature2?.image_url && (
        <div className=" mt-1">
          <div className="row">
            <div className="col-md-8 order-md-1 order-1">
              <img src={feature2.image_url} className="img-fluid" alt="Imagen" />
            </div>
            <div className="col-md-4 order-md-2 order-2">
              <div className="text-justify container">
                <h5 dangerouslySetInnerHTML={{ __html: feature2.descripcion_html || '' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {feature3?.image_url && (
        <div className=" mt-1 ">
          <div className="row ">
            <div className="col-md-4 order-md-1 order-2 ">
              <div className="ms-3 text-justify container">
                <h5 dangerouslySetInnerHTML={{ __html: feature3.descripcion_html || '' }} />
              </div>
            </div>
            <div className="col-md-8 order-md-3 order-1">
              <img src={feature3.image_url} className="img-fluid" alt="Imagen" />
            </div>
          </div>
        </div>
      )}

      {feature4?.image_url && (
        <div className="mt-1">
          <div className="row">
            <div className="col-md-8 order-md-1 order-1">
              <img src={feature4.image_url} className="img-fluid" alt="Imagen" />
            </div>
            <div className="col-md-4 order-md-2 order-2">
              <div className="text-justify container">
                <h5 dangerouslySetInnerHTML={{ __html: feature4.descripcion_html || '' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {feature5?.image_url && (
        <div className=" mt-1 ">
          <div className="row ">
            <div className="col-md-4 order-md-1 order-2 ">
              <div className="ms-3 text-justify container">
                <h5 dangerouslySetInnerHTML={{ __html: feature5.descripcion_html || '' }} />
              </div>
            </div>
            <div className="col-md-8 order-md-3 order-1">
              <img src={feature5.image_url} className="img-fluid" alt="Imagen" />
            </div>
          </div>
        </div>
      )}

      {images.length > 0 && (
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
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
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
      )}
    </div>
  );
}

export default ProyectoDetalle;

