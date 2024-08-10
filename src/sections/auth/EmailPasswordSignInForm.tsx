'use client';

import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { Field, Form } from 'src/components/hook-form';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { LoadingButton } from '@mui/lab';
import { zodResolver } from '@hookform/resolvers/zod';

export type SignInSchemaType = zod.infer<typeof SignInSchema>;


export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

const EmailPasswordSignInForm: React.FCC<{
  onSubmit: (params: { email: string; password: string }) => unknown;
  loading: boolean;
}> = ({ onSubmit, loading }) => {
  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const password = useBoolean();

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Field.Text
          label="Email address"
          InputLabelProps={{ shrink: true }}
          type="email"
          name="email"
          required
          placeholder="your@email.com"
        />

        <Stack spacing={1.5}>
          <Link
            component={RouterLink}
            href={paths.auth.resetPassword}
            variant="body2"
            color="inherit"
            sx={{ alignSelf: 'flex-end' }}
          >
            Forgot password?
          </Link>

          <Field.Text
            label="Password"
            placeholder="6+ characters"
            type={password.value ? 'text' : 'password'}
            InputLabelProps={{ shrink: true }}
            required
            name="password"
            data-cy={'password-input'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Sign in..."
        >
          Sign in
        </LoadingButton>
      </Stack>
      {/* <div className={'flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'common:emailAddress'} />

            <TextField.Input
              data-cy={'email-input'}
              required
              type="email"
              placeholder={t('emailPlaceholder')}
              {...emailControl}
            />
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'common:password'} />

            <TextField.Input
              required
              data-cy={'password-input'}
              type="password"
              placeholder={''}
              {...passwordControl}
            />

            <div className={'py-0.5 text-xs'}>
              <Link href={'/auth/password-reset'} className={'hover:underline'}>
                <Trans i18nKey={'auth:passwordForgottenQuestion'} />
              </Link>
            </div>
          </TextField.Label>
        </TextField>

        <div>
          <Button className={'w-full'} data-cy="auth-submit-button" type="submit" loading={loading}>
            <If condition={loading} fallback={<Trans i18nKey={'auth:signIn'} />}>
              <Trans i18nKey={'auth:signingIn'} />
            </If>
          </Button>
        </div>
      </div> */}
    </Form>
  );
};

export default EmailPasswordSignInForm;
