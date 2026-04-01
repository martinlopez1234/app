import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import 'jquery/dist/jquery.slim';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Nosotros from './pages/Nosotros';
import Nabvar from './components/Nabvar';
import ProyectoDetalle from './pages/ProyectoDetalle'; // Importa tu componente de detalle de proyecto
import Proyectos from './pages/Proyectos';
import Contacto from './pages/Contacto';
import { RequireAdmin } from './components/admin/RequireAdmin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminProjectsList } from './pages/admin/AdminProjectsList';
import { AdminProjectForm } from './pages/admin/AdminProjectForm';

function PublicShell() {
  return (
    <>
      <Nabvar />
      <Outlet />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<Navigate to="proyectos" replace />} />
          <Route path="proyectos" element={<AdminProjectsList />} />
          <Route path="proyectos/nuevo" element={<AdminProjectForm />} />
          <Route path="proyectos/:id" element={<AdminProjectForm />} />
        </Route>

        <Route element={<PublicShell />}>
          <Route path="/" element={<App />} />
          <Route path="/App" element={<Navigate to="/" replace />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
          <Route path="/Proyectos" element={<Proyectos />} />
          <Route path="/Contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();
