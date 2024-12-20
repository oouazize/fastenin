import { CONFIG } from 'src/config-global';

import { SupabaseUpdatePasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export const metadata = { title: `Update password | Supabase - ${CONFIG.site.name}` };

export default function Page() {
  return <SupabaseUpdatePasswordView />;
}
