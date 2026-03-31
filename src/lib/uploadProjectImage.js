import { supabase } from './supabaseClient';
import { getProjectImagesBucket } from './storageBucket';

export async function uploadProjectImage(file, folder) {
  if (!file) return null;
  const bucket = getProjectImagesBucket();
  const ext = file.name.split('.').pop() || 'jpg';
  const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, '-');
  const path = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
