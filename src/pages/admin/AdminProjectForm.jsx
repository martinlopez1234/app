import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { uploadProjectImage } from '../../lib/uploadProjectImage';

const emptyFeatures = () =>
  [1, 2, 3, 4, 5].map((slot) => ({
    slot,
    image_url: '',
    descripcion_html: '',
    file: null,
  }));

function makeGalleryEntry(file) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    file,
  };
}

export function AdminProjectForm() {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const galleryInputRef = useRef(null);
  const projectId = useMemo(() => {
    if (!idParam) return null;
    const n = parseInt(idParam, 10);
    return Number.isNaN(n) ? null : n;
  }, [idParam]);
  const isNew = projectId == null;

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [nombre, setNombre] = useState('');
  const [cover_image_url, setCoverImageUrl] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [caracteristicas_html, setCaracteristicasHtml] = useState('');
  const [descripcion_html, setDescripcionHtml] = useState('');
  const [published, setPublished] = useState(true);
  const [orden, setOrden] = useState(0);
  const [features, setFeatures] = useState(emptyFeatures);
  const [galleryUrls, setGalleryUrls] = useState([]);
  /** Archivos pendientes de subir; se acumulan en cada selección */
  const [galleryFileEntries, setGalleryFileEntries] = useState([]);

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return undefined;
    }
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      const { data: project, error: pErr } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();
      if (!alive) return;
      if (pErr || !project) {
        setError(pErr?.message || 'Proyecto no encontrado');
        setLoading(false);
        return;
      }
      setNombre(project.nombre || '');
      setCoverImageUrl(project.cover_image_url || '');
      setCaracteristicasHtml(project.caracteristicas_html || '');
      setDescripcionHtml(project.descripcion_html || '');
      setPublished(!!project.published);
      setOrden(project.orden ?? 0);

      const { data: feats } = await supabase
        .from('project_images')
        .select('slot, image_url, descripcion_html')
        .eq('project_id', projectId)
        .eq('kind', 'feature')
        .order('slot');

      const { data: gal } = await supabase
        .from('project_images')
        .select('image_url, orden')
        .eq('project_id', projectId)
        .eq('kind', 'gallery')
        .order('orden');

      const base = emptyFeatures();
      (feats || []).forEach((f) => {
        const i = base.findIndex((b) => b.slot === f.slot);
        if (i >= 0) {
          base[i] = { ...base[i], image_url: f.image_url || '', descripcion_html: f.descripcion_html || '' };
        }
      });
      setFeatures(base);
      setGalleryUrls((gal || []).map((g) => g.image_url).filter(Boolean));
      setGalleryFileEntries([]);
      setCoverFile(null);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [isNew, projectId]);

  const setFeatureField = (slot, field, value) => {
    setFeatures((prev) =>
      prev.map((f) => (f.slot === slot ? { ...f, [field]: value } : f))
    );
  };

  const removeGalleryUrl = (url) => {
    setGalleryUrls((prev) => prev.filter((u) => u !== url));
  };

  const removeGalleryFileEntry = (id) => {
    setGalleryFileEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const onGalleryFilesChosen = (fileList) => {
    const next = Array.from(fileList || []).map((file) => makeGalleryEntry(file));
    if (!next.length) return;
    setGalleryFileEntries((prev) => [...prev, ...next]);
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const folderBase = isNew ? `draft-${Date.now()}` : String(projectId);

      let coverUrl = cover_image_url.trim();
      if (coverFile) {
        coverUrl = await uploadProjectImage(coverFile, `${folderBase}/cover`);
      }
      if (!coverUrl) {
        throw new Error('Sube una imagen de portada.');
      }

      const featureRows = [];
      for (const f of features) {
        let url = f.image_url.trim();
        if (f.file) {
          url = await uploadProjectImage(f.file, `${folderBase}/feature-${f.slot}`);
        }
        if (url) {
          featureRows.push({
            kind: 'feature',
            slot: f.slot,
            orden: 0,
            image_url: url,
            descripcion_html: f.descripcion_html || null,
          });
        }
      }

      const newGalleryUrls = [];
      for (const entry of galleryFileEntries) {
        newGalleryUrls.push(await uploadProjectImage(entry.file, `${folderBase}/gallery`));
      }
      const allGallery = [...galleryUrls, ...newGalleryUrls];

      let pid = projectId;
      if (isNew) {
        const { data: inserted, error: insErr } = await supabase
          .from('projects')
          .insert({
            nombre: nombre.trim(),
            cover_image_url: coverUrl,
            caracteristicas_html: caracteristicas_html || null,
            descripcion_html: descripcion_html || null,
            published,
            orden: Number(orden) || 0,
          })
          .select('id')
          .single();
        if (insErr) throw insErr;
        pid = inserted.id;
      } else {
        const { error: upErr } = await supabase
          .from('projects')
          .update({
            nombre: nombre.trim(),
            cover_image_url: coverUrl,
            caracteristicas_html: caracteristicas_html || null,
            descripcion_html: descripcion_html || null,
            published,
            orden: Number(orden) || 0,
          })
          .eq('id', pid);
        if (upErr) throw upErr;
        const { error: delErr } = await supabase.from('project_images').delete().eq('project_id', pid);
        if (delErr) throw delErr;
      }

      if (featureRows.length) {
        const { error: fiErr } = await supabase.from('project_images').insert(
          featureRows.map((r) => ({ ...r, project_id: pid }))
        );
        if (fiErr) throw fiErr;
      }

      if (allGallery.length) {
        const { error: gErr } = await supabase.from('project_images').insert(
          allGallery.map((image_url, i) => ({
            project_id: pid,
            kind: 'gallery',
            slot: null,
            orden: i,
            image_url,
            descripcion_html: null,
          }))
        );
        if (gErr) throw gErr;
      }

      navigate('/admin/proyectos');
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <div className="mb-3">
        <Link to="/admin/proyectos" className="small text-decoration-none">
          ← Volver al listado
        </Link>
      </div>
      <h1 className="h4 mb-3">{isNew ? 'Nuevo proyecto' : `Editar proyecto #${projectId}`}</h1>

      <form onSubmit={onSubmit} className="card card-body shadow-sm">
        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Nombre</label>
            <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Posición</label>
            <input
              type="number"
              className="form-control"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              min={0}
            />
            <div className="form-text small">
              Orden en la grilla de proyectos: el número más bajo aparece primero.
            </div>
          </div>
          <div className="col-md-8 d-flex align-items-end">
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="pub"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="pub">
                Publicado (visible en el sitio web)
              </label>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Imagen de portada</label>
            {cover_image_url && !coverFile && (
              <div className="mb-2">
                <img src={cover_image_url} alt="" className="rounded border" style={{ maxHeight: 140 }} />
              </div>
            )}
            {coverFile && (
              <p className="small text-success mb-1">Nueva imagen seleccionada: {coverFile.name}</p>
            )}
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            />
            <div className="form-text small">
              {isNew
                ? 'Sube la foto principal que verán en la lista y en la cabecera del proyecto.'
                : 'Si no eliges archivo, se mantiene la portada actual.'}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Características</label>
            <textarea
              className="form-control font-monospace small"
              rows={8}
              value={caracteristicas_html}
              onChange={(e) => setCaracteristicasHtml(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control font-monospace small"
              rows={8}
              value={descripcion_html}
              onChange={(e) => setDescripcionHtml(e.target.value)}
            />
          </div>
        </div>

        <hr className="my-4" />
        <h2 className="h6">Bloques imagen + texto (1 a 5)</h2>
        <p className="small text-muted mb-3">
          Deja un bloque vacío si no lo necesitas. Sube una imagen y el texto que quieras mostrar junto a ella.
        </p>

        {features.map((f) => (
          <div key={f.slot} className="border rounded p-3 mb-3 bg-white">
            <div className="fw-semibold mb-2">Bloque {f.slot}</div>
            {f.image_url && !f.file && (
              <div className="mb-2">
                <img src={f.image_url} alt="" className="rounded border" style={{ maxHeight: 100 }} />
              </div>
            )}
            {f.file && <p className="small text-success mb-1">Nueva imagen: {f.file.name}</p>}
            <div className="mb-2">
              <label className="form-label small">Imagen</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={(e) => setFeatureField(f.slot, 'file', e.target.files?.[0] || null)}
              />
              {!isNew && (
                <div className="form-text small">Sin archivo nuevo se conserva la imagen ya guardada.</div>
              )}
            </div>
            <div>
              <label className="form-label small">Texto</label>
              <textarea
                className="form-control form-control-sm font-monospace"
                rows={3}
                value={f.descripcion_html}
                onChange={(e) => setFeatureField(f.slot, 'descripcion_html', e.target.value)}
              />
            </div>
          </div>
        ))}

        <hr className="my-4" />
        <h2 className="h6">Galería</h2>
        <p className="small text-muted">
          Puedes elegir varias fotos a la vez (Ctrl o Shift en el explorador) o ir añadiendo en varios pasos.
          Las nuevas se agregan al final.
        </p>
        <ul className="list-group mb-3">
          {galleryUrls.map((u, i) => (
            <li
              key={`g-${i}-${u.slice(-24)}`}
              className="list-group-item d-flex justify-content-between align-items-center gap-2 small"
            >
              <span className="text-truncate" title={u}>
                Foto en galería {i + 1}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger flex-shrink-0"
                onClick={() => removeGalleryUrl(u)}
              >
                Quitar
              </button>
            </li>
          ))}
          {galleryFileEntries.map((entry) => (
            <li
              key={entry.id}
              className="list-group-item d-flex justify-content-between align-items-center gap-2 small"
            >
              <span className="text-truncate">{entry.file.name}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger flex-shrink-0"
                onClick={() => removeGalleryFileEntry(entry.id)}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="form-control"
          onChange={(e) => onGalleryFilesChosen(e.target.files)}
        />

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
          <Link to="/admin/proyectos" className="btn btn-outline-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
