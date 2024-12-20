import { CONFIG } from 'src/config-global';

import { SupabaseSignUpView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Supabase - ${CONFIG.site.name}` };

export default function Page() {
  return <SupabaseSignUpView />;
}
