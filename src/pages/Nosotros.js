import React, { useEffect, useState } from 'react';
import { defaultAboutContent } from '../lib/siteContentDefaults';
import { supabase } from '../lib/supabaseClient';

function Nosotros() {
  const [content, setContent] = useState(defaultAboutContent);

  useEffect(() => {
    if (!supabase) return undefined;
    let alive = true;
    (async () => {
      const { data } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', 'about')
        .maybeSingle();
      if (alive && data?.content) {
        setContent({ ...defaultAboutContent, ...data.content });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      {content.hero_image_url && (
        <div className="card">
          <img
            src={content.hero_image_url}
            alt="Nuestra Empresa"
            className="img-fluid"
            loading="lazy"
          />
        </div>
      )}

      <div className="container">
        {content.office_title && <h3 className="text-center">{content.office_title}</h3>}
        {content.office_html && <div dangerouslySetInnerHTML={{ __html: content.office_html }} />}
      </div>

      {content.team_title && <h3 className="text-center">{content.team_title}</h3>}
      <div className="container-fluid mb-4">
        <div className="row justify-content-center">
          {(content.team || []).map((member, index) => (
            <div className="col-md-5 mb-3" key={`${member.name}-${index}`}>
              <div className="card h-100">
                {member.image_url && (
                  <img
                    src={member.image_url}
                    className="card-img-top"
                    alt={member.name || `Miembro del equipo ${index + 1}`}
                    loading="lazy"
                  />
                )}
                <div className="card-body">
                  {member.name && <h5 className="card-title">{member.name}</h5>}
                  {member.description_html && (
                    <div className="card-text" dangerouslySetInnerHTML={{ __html: member.description_html }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
