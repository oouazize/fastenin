import Stack from '@mui/material/Stack';

import { MotionContainer } from 'src/components/animate';
import Image from 'next/image';

// ----------------------------------------------------------------------

export function HeroBackground() {
  return (
    <Stack component={MotionContainer} alignItems="center" justifyContent="center">
      <Image
        src={'/assets/images/home/fastenin1-0-1.jpeg'}
        alt="cover"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </Stack>
  );
}