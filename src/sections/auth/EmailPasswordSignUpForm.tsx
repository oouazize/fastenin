import { FieldError, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { z as zod } from 'zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Field, Form } from 'src/components/hook-form';
import { Alert, InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { zodResolver } from '@hookform/resolvers/zod';

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

const EmailPasswordSignUpForm: React.FCC<{
  onSubmit: (params: { email: string; password: string }) => unknown;
  loading: boolean;
}> = ({ onSubmit, loading }) => {
  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit, formState } = methods;

  const errors = formState.errors;

  const password = useBoolean();

  return (
    <>
      <ErrorAlert error={errors.email} />
      <ErrorAlert error={errors.password} />

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Field.Text
            data-cy={'email-input'}
            required
            name="email"
            type="email"
            label="Email address"
            placeholder="your@email.com"
            InputLabelProps={{ shrink: true }}
          />

          <Field.Text
            required
            data-cy={'password-input'}
            name="password"
            label="Password"
            placeholder="6+ characters"
            type={password.value ? 'text' : 'password'}
            InputLabelProps={{ shrink: true }}
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

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Create account..."
          >
            Create account
          </LoadingButton>
        </Stack>
        {/* <div className={'flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'common:emailAddress'} />

            <TextField.Input
              {...emailControl}
              data-cy={'email-input'}
              required
              type="email"
              placeholder={t('auth:emailPlaceholder')}
            />
          </TextField.Label>

          <TextField.Error error={errors.email?.message} />
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'common:password'} />

            <TextField.Input
              {...passwordControl}
              data-cy={'password-input'}
              required
              type="password"
              placeholder={''}
            />

            <TextField.Hint>
              <Trans i18nKey={'auth:passwordHint'} />
            </TextField.Hint>

            <TextField.Error
              data-cy="password-error"
              error={errors.password?.message}
            />
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'auth:repeatPassword'} />

            <TextField.Input
              {...repeatPasswordControl}
              data-cy={'repeat-password-input'}
              required
              type="password"
              placeholder={''}
            />

            <TextField.Hint>
              <Trans i18nKey={'auth:repeatPasswordHint'} />
            </TextField.Hint>

            <TextField.Error
              data-cy="repeat-password-error"
              error={errors.repeatPassword?.message}
            />
          </TextField.Label>
        </TextField>

        <div>
          <Button
            data-cy={'auth-submit-button'}
            className={'w-full'}
            type="submit"
            loading={loading}
          >
            <If
              condition={loading}
              fallback={<Trans i18nKey={'auth:getStarted'} />}
            >
              <Trans i18nKey={'auth:signingUp'} />
            </If>
          </Button>
        </div>
      </div> */}
      </Form>
    </>
  );
};

export default EmailPasswordSignUpForm;

const ErrorAlert = ({ error }: { error?: FieldError }) =>
  !!error && (
    <Alert severity="error" sx={{ mb: 3 }}>
      {error.message}
    </Alert>
  );
