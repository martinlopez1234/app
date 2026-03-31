import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAdminSession } from '../../hooks/useAdminSession';

export function AdminLogin() {
  const location = useLocation();
  const from = location.state?.from || '/admin/proyectos';
  const { session, isAdmin, loading } = useAdminSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!supabase) {
    return (
      <div className="container py-5">
        <p>Configura Supabase en el archivo `.env`.</p>
      </div>
    );
  }

  if (!loading && session && isAdmin) {
    return <Navigate to={from} replace />;
  }

  if (!loading && session && !isAdmin) {
    return (
      <div className="container py-5" style={{ maxWidth: 420 }}>
        <h1 className="h5">Cuenta sin permisos</h1>
        <p className="text-muted small">
          Iniciaste sesión, pero este usuario no está en <code>admin_users</code>. Pide a quien administra la
          base de datos que ejecute el <code>INSERT</code> con tu UUID.
        </p>
        <button type="button" className="btn btn-primary" onClick={() => supabase.auth.signOut()}>
          Cerrar sesión
        </button>
        <p className="mt-3 small mb-0">
          <Link to="/">Volver al inicio</Link>
        </p>
      </div>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h1 className="h4 mb-3">Acceso administrador</h1>
      <p className="text-muted small mb-4">
        Solo usuarios listados en <code>admin_users</code> pueden editar proyectos.
      </p>
      <form onSubmit={onSubmit} className="card card-body shadow-sm">
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={busy}>
          {busy ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="mt-3 small">
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
