import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { defaultAboutContent, defaultContactContent } from '../../lib/siteContentDefaults';
import { supabase } from '../../lib/supabaseClient';
import { uploadProjectImage } from '../../lib/uploadProjectImage';

function makeMember() {
  return { name: '', image_url: '', image_file: null, description_html: '' };
}

export function AdminContentList() {
  const location = useLocation();
  const savedSection = location.state?.savedSection;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">Contenidos</h1>
      </div>
      {savedSection && (
        <div className="alert alert-success py-2 small">
          Cambios de {savedSection} guardados correctamente.
        </div>
      )}
      <div className="table-responsive card">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Sección</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nosotros</td>
              <td>Texto de oficina, imagen principal y equipo.</td>
              <td className="text-end">
                <Link to="/admin/contenidos/nosotros" className="btn btn-sm btn-outline-primary">
                  Editar
                </Link>
              </td>
            </tr>
            <tr>
              <td>Contacto</td>
              <td>Dirección, teléfono, correo, horario e imagen.</td>
              <td className="text-end">
                <Link to="/admin/contenidos/contacto" className="btn btn-sm btn-outline-primary">
                  Editar
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminAboutForm() {
  const navigate = useNavigate();
  const [about, setAbout] = useState(defaultAboutContent);
  const [aboutHeroFile, setAboutHeroFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error: err } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', 'about')
        .maybeSingle();
      if (!alive) return;
      if (err) setError(err.message);
      else if (data?.content) setAbout({ ...defaultAboutContent, ...data.content });
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const setAboutField = (field, value) => setAbout((prev) => ({ ...prev, [field]: value }));

  const setMemberField = (index, field, value) => {
    setAbout((prev) => ({
      ...prev,
      team: prev.team.map((member, i) => (i === index ? { ...member, [field]: value } : member)),
    }));
  };

  const addMember = () => setAbout((prev) => ({ ...prev, team: [...(prev.team || []), makeMember()] }));
  const removeMember = (index) => {
    setAbout((prev) => ({ ...prev, team: prev.team.filter((_, i) => i !== index) }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const nextAbout = { ...about };
      if (aboutHeroFile) {
        nextAbout.hero_image_url = await uploadProjectImage(aboutHeroFile, 'site-content/about');
      }

      const nextTeam = [];
      for (const [index, member] of (nextAbout.team || []).entries()) {
        let imageUrl = member.image_url || '';
        if (member.image_file) {
          imageUrl = await uploadProjectImage(member.image_file, `site-content/team-${index + 1}`);
        }
        nextTeam.push({
          name: member.name || '',
          image_url: imageUrl,
          description_html: member.description_html || '',
        });
      }
      nextAbout.team = nextTeam;

      const { error: upsertError } = await supabase
        .from('site_content')
        .upsert({ section_key: 'about', content: nextAbout });
      if (upsertError) throw upsertError;

      navigate('/admin/contenidos', { state: { savedSection: 'Nosotros' } });
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando Nosotros...</p>;

  return (
    <form onSubmit={onSubmit} className="card card-body shadow-sm">
      <div className="mb-3">
        <Link to="/admin/contenidos" className="small text-decoration-none">
          Volver al listado
        </Link>
      </div>
      <h1 className="h4 mb-3">Editar Nosotros</h1>
      {error && <div className="alert alert-danger py-2 small">{error}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título oficina</label>
          <input className="form-control" value={about.office_title} onChange={(e) => setAboutField('office_title', e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Título equipo</label>
          <input className="form-control" value={about.team_title} onChange={(e) => setAboutField('team_title', e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Imagen principal</label>
          {about.hero_image_url && !aboutHeroFile && <img src={about.hero_image_url} alt="" className="d-block rounded border mb-2" style={{ maxHeight: 120 }} />}
          {aboutHeroFile && <p className="small text-success mb-1">Nueva imagen: {aboutHeroFile.name}</p>}
          <input type="file" accept="image/*" className="form-control" onChange={(e) => setAboutHeroFile(e.target.files?.[0] || null)} />
        </div>
        <div className="col-12">
          <label className="form-label">Texto oficina</label>
          <RichTextEditor value={about.office_html} onChange={(value) => setAboutField('office_html', value)} minHeight={180} />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
        <h2 className="h6 mb-0">Equipo</h2>
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={addMember}>Agregar persona</button>
      </div>
      {(about.team || []).map((member, index) => (
        <div className="border rounded p-3 mb-3" key={index}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Persona {index + 1}</strong>
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeMember(index)}>Quitar</button>
          </div>
          <label className="form-label small">Nombre</label>
          <input className="form-control mb-2" value={member.name} onChange={(e) => setMemberField(index, 'name', e.target.value)} />
          {member.image_url && !member.image_file && <img src={member.image_url} alt="" className="d-block rounded border mb-2" style={{ maxHeight: 100 }} />}
          {member.image_file && <p className="small text-success mb-1">Nueva imagen: {member.image_file.name}</p>}
          <label className="form-label small">Foto</label>
          <input type="file" accept="image/*" className="form-control mb-2" onChange={(e) => setMemberField(index, 'image_file', e.target.files?.[0] || null)} />
          <label className="form-label small">Descripción</label>
          <RichTextEditor value={member.description_html} onChange={(value) => setMemberField(index, 'description_html', value)} minHeight={120} />
        </div>
      ))}

      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Nosotros'}
        </button>
        <Link to="/admin/contenidos" className="btn btn-outline-secondary">
          Cancelar
        </Link>
      </div>
    </form>
  );
}

export function AdminContactForm() {
  const navigate = useNavigate();
  const [contact, setContact] = useState(defaultContactContent);
  const [contactImageFile, setContactImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error: err } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', 'contact')
        .maybeSingle();
      if (!alive) return;
      if (err) setError(err.message);
      else if (data?.content) setContact({ ...defaultContactContent, ...data.content });
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const setContactField = (field, value) => setContact((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const nextContact = { ...contact };
      if (contactImageFile) {
        nextContact.image_url = await uploadProjectImage(contactImageFile, 'site-content/contact');
      }

      const { error: upsertError } = await supabase
        .from('site_content')
        .upsert({ section_key: 'contact', content: nextContact });
      if (upsertError) throw upsertError;

      navigate('/admin/contenidos', { state: { savedSection: 'Contacto' } });
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando Contacto...</p>;

  return (
    <form onSubmit={onSubmit} className="card card-body shadow-sm">
      <div className="mb-3">
        <Link to="/admin/contenidos" className="small text-decoration-none">
          Volver al listado
        </Link>
      </div>
      <h1 className="h4 mb-3">Editar Contacto</h1>
      {error && <div className="alert alert-danger py-2 small">{error}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input className="form-control" value={contact.title} onChange={(e) => setContactField('title', e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Título horario</label>
          <input className="form-control" value={contact.hours_title} onChange={(e) => setContactField('hours_title', e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Dirección</label>
          <input className="form-control" value={contact.address} onChange={(e) => setContactField('address', e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Teléfono</label>
          <input className="form-control" value={contact.phone} onChange={(e) => setContactField('phone', e.target.value)} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Correo</label>
          <input className="form-control" value={contact.email} onChange={(e) => setContactField('email', e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Imagen contacto</label>
          {contact.image_url && !contactImageFile && <img src={contact.image_url} alt="" className="d-block rounded border mb-2" style={{ maxHeight: 120 }} />}
          {contactImageFile && <p className="small text-success mb-1">Nueva imagen: {contactImageFile.name}</p>}
          <input type="file" accept="image/*" className="form-control" onChange={(e) => setContactImageFile(e.target.files?.[0] || null)} />
        </div>
        <div className="col-12">
          <label className="form-label">Horario</label>
          <RichTextEditor value={contact.hours_html} onChange={(value) => setContactField('hours_html', value)} minHeight={140} />
        </div>
      </div>

      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Contacto'}
        </button>
        <Link to="/admin/contenidos" className="btn btn-outline-secondary">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
