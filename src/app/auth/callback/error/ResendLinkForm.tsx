'use client';

import useMutation from 'swr/mutation';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import useSupabase from 'src/auth/hooks/use-supabase';
import { Field } from 'src/components/hook-form';

function ResendLinkForm() {
  const resendLink = useResendLink();

  if (resendLink.data && !resendLink.isMutating) {
    return <Alert>We sent you a new link to your email! Follow the link to sign in.</Alert>;
  }

  return (
    <form
      className={'flex flex-col space-y-2'}
      onSubmit={(data) => {
        data.preventDefault();

        const email = new FormData(data.currentTarget).get('email') as string;

        resendLink.trigger(email);
      }}
    >
      <Field.Text
        label="Email address"
        InputLabelProps={{ shrink: true }}
        type="email"
        name="email"
        required
        placeholder=""
      />

      <Button disabled={resendLink.isMutating}>Resend link </Button>
    </form>
  );
}

export default ResendLinkForm;

function useResendLink() {
  const supabase = useSupabase();

  return useMutation(
    ['resend-link'],
    async (
      _,
      data: {
        arg: string;
      }
    ) => {
      const response = await supabase.auth.resend({
        email: data.arg,
        type: 'signup',
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    }
  );
}
