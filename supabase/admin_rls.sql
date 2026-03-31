-- Ejecutar en Supabase SQL Editor DESPUÉS de `schema.sql`
-- Añade admins, función is_admin(), políticas de escritura y bucket de Storage.

-- 1) Tabla de administradores (UUID = auth.users.id)
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admin_users enable row level security;

drop policy if exists "Users can read own admin row" on public.admin_users;
create policy "Users can read own admin row"
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid());

-- 2) Función para RLS (evita recursión; corre con permisos del owner)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users a
    where a.user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to authenticated, anon;

-- 3) Projects: lectura pública de publicados + admins ven todo; escritura solo admin
drop policy if exists "Public can read published projects" on public.projects;
drop policy if exists "Anyone can read published projects" on public.projects;

create policy "Read projects if published or admin"
  on public.projects
  for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "Admins insert projects" on public.projects;
drop policy if exists "Admins update projects" on public.projects;
drop policy if exists "Admins delete projects" on public.projects;

create policy "Admins insert projects"
  on public.projects
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update projects"
  on public.projects
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete projects"
  on public.projects
  for delete
  to authenticated
  using (public.is_admin());

-- 4) Imágenes: lectura si el proyecto es público o eres admin
drop policy if exists "Public can read project images" on public.project_images;
drop policy if exists "Anyone can read images for visible projects" on public.project_images;

create policy "Read project_images if project visible or admin"
  on public.project_images
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_images.project_id
        and (p.published = true or public.is_admin())
    )
  );

drop policy if exists "Admins insert project_images" on public.project_images;
drop policy if exists "Admins update project_images" on public.project_images;
drop policy if exists "Admins delete project_images" on public.project_images;

create policy "Admins insert project_images"
  on public.project_images
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update project_images"
  on public.project_images
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete project_images"
  on public.project_images
  for delete
  to authenticated
  using (public.is_admin());

-- 5) Storage: bucket público para lectura; subida solo admins
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read project-images" on storage.objects;
create policy "Public read project-images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-images');

drop policy if exists "Admins upload project-images" on storage.objects;
create policy "Admins upload project-images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'project-images'
    and public.is_admin()
  );

drop policy if exists "Admins update project-images" on storage.objects;
create policy "Admins update project-images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin())
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins delete project-images" on storage.objects;
create policy "Admins delete project-images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin());

-- 6) Primer admin (reemplaza el UUID por el de Authentication → Users → tu usuario)
-- insert into public.admin_users (user_id) values ('00000000-0000-0000-0000-000000000000');
