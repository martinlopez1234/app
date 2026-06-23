import React, { useEffect, useState } from 'react';
import { defaultContactContent } from '../lib/siteContentDefaults';
import { supabase } from '../lib/supabaseClient';

function Contacto() {
  const [content, setContent] = useState(defaultContactContent);

  useEffect(() => {
    if (!supabase) return undefined;
    let alive = true;
    (async () => {
      const { data } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', 'contact')
        .maybeSingle();
      if (alive && data?.content) {
        setContent({ ...defaultContactContent, ...data.content });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="container-fluid mt-5 d-flex">
      <div className="row flex-grow-1 w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center p-5">
          {content.title && <h3>{content.title}</h3>}
          {content.address && (
            <p>
              <strong>Dirección:</strong> {content.address}
            </p>
          )}
          {content.phone && (
            <p>
              <strong>Teléfono:</strong> {content.phone}
            </p>
          )}
          {content.email && (
            <p>
              <strong>Correo Electrónico:</strong> {content.email}
            </p>
          )}

          {content.hours_title && <h3 className="mt-4">{content.hours_title}</h3>}
          {content.hours_html && <div dangerouslySetInnerHTML={{ __html: content.hours_html }} />}
        </div>

        {content.image_url && (
          <div className="col-md-6 d-flex align-items-center justify-content-center contacto-imagen">
            <img
              src={content.image_url}
              alt="Contacto"
              loading="lazy"
              className="img-fluid"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacto;
