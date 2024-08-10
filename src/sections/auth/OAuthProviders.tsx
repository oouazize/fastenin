'use client';

import { useCallback } from 'react';
import { CONFIG } from 'src/config-global';
import { paths } from 'src/routes/paths';
import AuthProviderButton from './AuthProviderButton';
import AuthErrorMessage from './AuthErrorMessage';
import useSignInWithProvider from 'src/auth/hooks/use-sign-in-with-provider';
import { Stack } from '@mui/material';

const OAUTH_PROVIDERS = CONFIG.auth.providers;

const OAuthProviders: React.FCC<{
  returnUrl?: string;
  inviteCode?: string;
}> = (props) => {
  const signInWithProviderMutation = useSignInWithProvider();

  const onSignInWithProvider = useCallback(async (signInRequest: () => Promise<unknown>) => {
    try {
      const credential = await signInRequest();

      if (!credential) {
        return Promise.reject();
      }
    } catch (error) {
      throw error;
    }
  }, []);

  if (!OAUTH_PROVIDERS || !OAUTH_PROVIDERS.length) {
    return null;
  }

  return (
    <div className={'flex w-full flex-1 flex-col space-y-3'}>
      <Stack spacing={2}>
        {OAUTH_PROVIDERS.map((provider) => {
          return (
            <AuthProviderButton
              key={provider}
              providerId={provider}
              onClick={() => {
                const origin = window.location.origin;
                const callback = paths.auth.authCallback;
                const queryParams = new URLSearchParams();

                if (props.returnUrl) {
                  queryParams.set('next', props.returnUrl);
                }

                if (props.inviteCode) {
                  queryParams.set('inviteCode', props.inviteCode);
                }

                const redirectPath = [callback, queryParams.toString()].join('?');

                const redirectTo = [origin, redirectPath].join('');

                const credentials = {
                  provider,
                  options: {
                    redirectTo,
                  },
                };

                return onSignInWithProvider(() => signInWithProviderMutation.trigger(credentials));
              }}
            >
              {`Sign in with ` + getProviderName(provider)}
            </AuthProviderButton>
          );
        })}
      </Stack>

      <AuthErrorMessage error={signInWithProviderMutation.error} />
    </div>
  );
};

function getProviderName(providerId: string) {
  const capitalize = (value: string) => value.slice(0, 1).toUpperCase() + value.slice(1);

  if (providerId.endsWith('.com')) {
    return capitalize(providerId.split('.com')[0]);
  }

  return capitalize(providerId);
}

export default OAuthProviders;
