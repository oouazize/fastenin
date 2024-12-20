import useMutation from 'swr/mutation';
import useSupabase from './use-supabase';
import { VerifyOtpParams } from '@supabase/supabase-js';

/**
 * @name useVerifyOtp
 * @description Verify the OTP sent to the user's phone number
 */
function useVerifyOtp() {
  const client = useSupabase();

  return useMutation(['verify-otp'], async (_, { arg }: { arg: VerifyOtpParams }) => {
    const { data, error } = await client.auth.verifyOtp(arg);

    if (error) {
      throw error;
    }

    return data;
  });
}

export default useVerifyOtp;
