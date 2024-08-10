import { useCallback } from 'react';
import useSupabase from './use-supabase';

/**
 * @name useSignOut
 */
function useSignOut() {
  const client = useSupabase();

  return useCallback(async () => {
    await client.auth.signOut();
  }, [client.auth]);
}

export default useSignOut;
