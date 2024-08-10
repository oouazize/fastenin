'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { paths } from 'src/routes/paths';
import OAuthProviders from './OAuthProviders';
import EmailPasswordSignUpContainer from './EmailPasswordSignUpContainer';
import { Stack } from '@mui/material';

function SignUpMethodsContainer() {
  const router = useRouter();

  const onSignUp = useCallback(() => {
    router.replace(paths.dashboard.root);
  }, [router]);

  return (
    <Stack spacing={2}>
      <OAuthProviders />

        <span className={'text-xs text-gray-400 text-center'}>or continue with email</span>

      <EmailPasswordSignUpContainer onSignUp={onSignUp} />
    </Stack>
  );
}

export default SignUpMethodsContainer;
