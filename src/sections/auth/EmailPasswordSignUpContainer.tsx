'use client';

import { useCallback, useEffect, useRef } from 'react';

import AuthErrorMessage from './AuthErrorMessage';
import useSignUpWithEmailAndPasswordMutation from 'src/auth/hooks/use-sign-up-with-email-password';
import EmailPasswordSignUpForm from './EmailPasswordSignUpForm';

const EmailPasswordSignUpContainer: React.FCC<{
  onSignUp: (userId?: string) => unknown;
  onError?: (error?: unknown) => unknown;
}> = ({ onSignUp, onError }) => {
  const signUpMutation = useSignUpWithEmailAndPasswordMutation();
  const redirecting = useRef(false);
  const loading = signUpMutation.isMutating || redirecting.current;

  const callOnErrorCallback = useCallback(() => {
    if (signUpMutation.error && onError) {
      onError(signUpMutation.error);
    }
  }, [signUpMutation.error, onError]);

  useEffect(() => {
    callOnErrorCallback();
  }, [callOnErrorCallback]);

  const onSignupRequested = useCallback(
    async (params: { email: string; password: string }) => {
      if (loading) {
        return;
      }

      try {
        const data = await signUpMutation.trigger(params);

        // If the user is required to confirm their email, we display a message
        onSignUp(data.user?.id);
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
    },
    [loading, onError, onSignUp, signUpMutation]
  );

  return (
    <>
      <AuthErrorMessage error={signUpMutation.error} />

      <EmailPasswordSignUpForm onSubmit={onSignupRequested} loading={loading} />
    </>
  );
};

export default EmailPasswordSignUpContainer;
