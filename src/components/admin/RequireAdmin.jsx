import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminSession } from '../../hooks/useAdminSession';
import { supabase } from '../../lib/supabaseClient';

export function RequireAdmin({ children }) {
  const location = useLocation();
  const { session, isAdmin, loading } = useAdminSession();

  if (!supabase) {
    return (
      <div className="container py-5">
        <p>Supabase no está configurado en el `.env`.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <div className="container py-5">
        <h1>Sin permisos</h1>
        <p className="text-muted">
          Tu usuario no está en la tabla <code>admin_users</code> de Supabase.
        </p>
        <button
          type="button"
          className="btn btn-outline-secondary mt-2"
          onClick={() => supabase.auth.signOut()}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return children;
}
