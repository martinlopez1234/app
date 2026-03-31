import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export function AdminLayout() {
  return (
    <div className="bg-light min-vh-100">
      <header className="bg-white border-bottom py-3 mb-3">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-3">
            <strong>Mantenedor</strong>
            <Link to="/admin/proyectos" className="text-decoration-none">
              Proyectos
            </Link>
          </div>
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-sm btn-outline-primary">
              Ver sitio
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => supabase.auth.signOut()}
            >
              Salir
            </button>
          </div>
        </div>
      </header>
      <div className="container pb-5">
        <Outlet />
      </div>
    </div>
  );
}
