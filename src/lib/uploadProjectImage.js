import { supabase } from './supabaseClient';
import { getProjectImagesBucket } from './storageBucket';

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

async function optimizeImage(file) {
  if (!file?.type?.startsWith('image/') || file.type === 'image/gif' || file.size < 450 * 1024) {
    return file;
  }

  const imageUrl = URL.createObjectURL(file);
  const image = new Image();
  image.src = imageUrl;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  URL.revokeObjectURL(imageUrl);

  const maxWidth = 1800;
  const scale = Math.min(1, maxWidth / image.width);
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, 'image/jpeg', 0.82);
  if (!blob || blob.size >= file.size) return file;

  const baseName = file.name.replace(/\.[^.]+$/, '');
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
}

export async function uploadProjectImage(file, folder) {
  if (!file) return null;
  const optimizedFile = await optimizeImage(file);
  const bucket = getProjectImagesBucket();
  const ext = optimizedFile.name.split('.').pop() || 'jpg';
  const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, '-');
  const path = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, optimizedFile, {
    cacheControl: '31536000',
    upsert: false,
    contentType: optimizedFile.type || 'image/jpeg',
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
