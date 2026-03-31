import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/proyectos.css'; // Importa tu archivo de estilos
import { supabase } from '../lib/supabaseClient';

function Proyectos() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        if (!supabase) {
          throw new Error(
            'Supabase no configurado. Agrega `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_ANON_KEY` en un archivo `.env`.'
          );
        }

        setLoading(true);
        setError(null);

        // Esperamos esta estructura:
        // - tabla `projects`: id, nombre, cover_image_url, published, orden
        const { data, error } = await supabase
          .from('projects')
          .select('id, nombre, cover_image_url')
          .eq('published', true)
          .order('orden', { ascending: true });

        if (error) throw error;
        if (!isMounted) return;

        setProjects(data || []);
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || String(err));
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const changeImage = (element) => {
    element.classList.add('hovered');
  };

  const restoreImage = (element) => {
    element.classList.remove('hovered');
  };

  return (
    <div className="">
      {loading && <p className="text-center mt-5">Cargando proyectos...</p>}
      {!loading && error && <p className="text-center mt-5">{error}</p>}

      {!loading && !error && (
        <div className="row g-0">
          {projects.map((project) => (
            <div className="col-md-4" key={project.id}>
              <Link to={`/proyecto/${project.id}`}>
                <div
                  className="card card-proyecto"
                  onMouseOver={(e) => changeImage(e.target)}
                  onMouseOut={(e) => restoreImage(e.target)}
                >
                  <div className="image-container">
                    <img
                      src={project.cover_image_url}
                      className="card-img-top project-image"
                      alt={project.nombre || 'Proyecto'}
                      id="proyecto1"
                    />
                    <div className="image-text" id="text-proyecto1">
                      {project.nombre}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Proyectos;

