import { CONFIG } from 'src/config-global';

import { SupabaseSignInView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Supabase - ${CONFIG.site.name}` };

export default function Page() {
  return <SupabaseSignInView />;
}
