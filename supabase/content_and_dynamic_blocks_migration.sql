-- Ejecutar en Supabase SQL Editor si la base ya existe.
-- Permite bloques de proyecto ilimitados y agrega el contenido editable de Nosotros/Contacto.

alter table public.project_images
  drop constraint if exists project_images_feature_slot;

alter table public.project_images
  add constraint project_images_feature_slot check (
    (kind = 'feature' and slot is not null and slot >= 1)
    or (kind = 'gallery' and slot is null)
  );

create table if not exists public.site_content (
  section_key text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
drop policy if exists "Read site_content" on public.site_content;
create policy "Read site_content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins insert site_content" on public.site_content;
drop policy if exists "Admins update site_content" on public.site_content;
drop policy if exists "Admins delete site_content" on public.site_content;

create policy "Admins insert site_content"
  on public.site_content
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update site_content"
  on public.site_content
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete site_content"
  on public.site_content
  for delete
  to authenticated
  using (public.is_admin());
