import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';
import '../styles/App.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      try {
        if (!supabase) {
          throw new Error(
            'Supabase no configurado. Agrega `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_ANON_KEY` en un archivo `.env`.'
          );
        }

        setLoading(true);
        setError(null);

        const { data, error: projectsError } = await supabase
          .from('projects')
          .select('id, nombre, cover_image_url')
          .eq('published', true)
          .order('orden', { ascending: true });

        if (projectsError) throw projectsError;
        if (!isMounted) return;

        setImages((data || []).map((project) => project.cover_image_url).filter(Boolean));
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || String(err));
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-container">
      <div className="">
        {loading && <p className="text-center mt-5">Cargando portada...</p>}
        {!loading && error && <p className="text-center mt-5">{error}</p>}

        {!loading && !error && images.length > 0 && (
          <Carousel controls={false} indicators={false}>
            {images.map((image, index) => (
              <Carousel.Item key={image || index}>
                <img
                  style={{
                    objectFit: 'cover',
                    height:
                      window.innerWidth > 1024 && window.innerWidth <= 1366
                        ? '80vh'
                        : window.innerWidth > 768
                          ? '100vh'
                          : '110vh',
                    width: '100%',
                  }}
                  className="d-block img-fluid"
                  src={image}
                  loading="lazy"
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {!loading && !error && images.length === 0 && (
          <p className="text-center mt-5">No hay imágenes publicadas para mostrar en el inicio.</p>
        )}

        <div className="card-img-overlay d-flex align-items-center ms-3 mt-5">
          <div></div>
          <div>
            <Link
              className="btn card-img-overlay text-white"
              to="/Proyectos"
              style={{
                marginTop: '820px',
                color: 'white',
                transition: 'color 0.3s',
                border: 'none',
              }}
              onMouseOver={(e) => (e.target.style.color = 'gray')}
              onMouseOut={(e) => (e.target.style.color = 'white')}
            >
              <h4>Nuestros Proyectos</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

