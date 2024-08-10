import { redirect } from 'next/navigation';

import Alert from '@mui/material/Alert';

import ResendLinkForm from './ResendLinkForm';
import Button from '@mui/material/Button';

interface Params {
  searchParams: {
    error: string;
  };
}

function AuthCallbackErrorPage({ searchParams }: Params) {
  const { error } = searchParams;

  // if there is no error, redirect the user to the sign-in page
  if (!error) {
    redirect('/auth/sign-in');
  }

  return (
    <div className={'flex flex-col space-y-4 py-4'}>
      <div>
        <Alert severity="error">Authentication Error</Alert>
      </div>

      <ResendLinkForm />

      <div className={'flex flex-col space-y-2'}>
        <Button variant={'outlined'}>
          <a href={'/auth/sign-in'}>Sign In</a>
        </Button>
      </div>
    </div>
  );
}

export default AuthCallbackErrorPage;
