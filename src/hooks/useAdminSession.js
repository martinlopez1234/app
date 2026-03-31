import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useAdminSession() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      setIsAdmin(false);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const checkAdmin = async (userId) => {
      if (!userId) {
        if (!cancelled) setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();
      if (cancelled) return;
      setIsAdmin(!error && !!data);
    };

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (cancelled) return;
      setSession(s ?? null);
      checkAdmin(s?.user?.id).finally(() => {
        if (!cancelled) setLoading(false);
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null);
      setLoading(true);
      checkAdmin(s?.user?.id).finally(() => {
        if (!cancelled) setLoading(false);
      });
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading, user: session?.user ?? null };
}
