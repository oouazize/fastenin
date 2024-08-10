'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';
import OAuthProviders from './OAuthProviders';
import EmailPasswordSignInContainer from './EmailPasswordSignInContainer';
import { Stack } from '@mui/material';

function SignInMethodsContainer() {
  const router = useRouter();

  const onSignIn = useCallback(() => {
    router.replace(paths.dashboard.root);
  }, [router]);

  return (
    <Stack spacing={2}>
      <OAuthProviders />

      <span className={'text-xs text-gray-400 text-center'}>or continue with email</span>

      <EmailPasswordSignInContainer onSignIn={onSignIn} />
    </Stack>
  );
}

export default SignInMethodsContainer;
