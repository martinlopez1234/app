export const getProjectImagesBucket = () =>
  process.env.REACT_APP_SUPABASE_STORAGE_BUCKET || 'project-images';
