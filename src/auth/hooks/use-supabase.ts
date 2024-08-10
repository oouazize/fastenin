import { useMemo } from 'react';
import getSupabaseBrowserClient from 'src/lib/supabase/browser-client';

function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;
