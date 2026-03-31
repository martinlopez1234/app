import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export function AdminProjectsList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('projects')
        .select('id, nombre, published, orden, created_at')
        .order('orden', { ascending: true });
      if (!alive) return;
      if (err) setError(err.message);
      else setRows(data || []);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto y todas sus imágenes?')) return;
    const { error: err } = await supabase.from('projects').delete().eq('id', id);
    if (err) {
      alert(err.message);
      return;
    }
    setRows((r) => r.filter((x) => x.id !== id));
  };

  if (loading) {
    return <p>Cargando proyectos...</p>;
  }
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">Proyectos</h1>
        <Link to="/admin/proyectos/nuevo" className="btn btn-primary btn-sm">
          Nuevo proyecto
        </Link>
      </div>
      <div className="table-responsive card">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Posición</th>
              <th>Nombre</th>
              <th>Publicado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.orden}</td>
                <td>{p.nombre}</td>
                <td>{p.published ? 'Sí' : 'No'}</td>
                <td className="text-end text-nowrap">
                  <Link to={`/admin/proyectos/${p.id}`} className="btn btn-sm btn-outline-primary me-1">
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(p.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <p className="text-muted mt-3">No hay proyectos todavía.</p>}
    </div>
  );
}
