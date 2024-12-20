import { CONFIG } from 'src/config-global';

import { SupabaseResetPasswordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export const metadata = { title: `Reset password | Supabase - ${CONFIG.site.name}` };

export default function Page() {
  return <SupabaseResetPasswordView />;
}
