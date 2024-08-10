import { Button } from '@mui/material';
import AuthProviderLogo from './AuthProviderLogo';

const AuthProviderButton: React.FCC<{
  providerId: string;
  onClick: () => unknown;
}> = ({ children, providerId, onClick }) => {
  return (
    <Button
      data-cy={'auth-provider-button'}
      variant="outlined"
      className="w-full"
      onClick={onClick}
      data-provider={providerId}
      sx={{ padding: '10px 20px' }}
    >
      <AuthProviderLogo providerId={providerId} />

      <span className={'flex w-full flex-1 items-center'}>
        <span className={'flex w-full items-center justify-center'}>
          <span className={'text-current font-medium'}>{children}</span>
        </span>
      </span>
    </Button>
  );
};

export default AuthProviderButton;
