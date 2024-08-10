'use client';

import type { StackProps } from '@mui/material/Stack';

import type { IPostItem } from 'src/types/blog';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { varFade, varScale, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatXIcon } from './components/svg-elements';
import { useState, useEffect, useTransition } from 'react';

import { getPosts } from 'src/actions/blog-ssr';
import { PostList } from '../blog/post-list';

// ----------------------------------------------------------------------

export function HomePricing({ sx, ...other }: StackProps) {
  const [posts, setPosts] = useState<IPostItem[]>([]);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const { posts } = await getPosts();
      setPosts(posts);
    });
  }, []);

  const renderDescription = (
    <SectionTitle
      caption="Blogs"
      title="Things to know about"
      txtGradient="fasting"
      button={{
        title: 'Browse all blogs',
        href: paths.post.root,
      }}
      sx={{ mb: 8, textAlign: 'center' }}
    />
  );

  return (
    <Stack component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        <FloatLine vertical sx={{ top: 0, left: 80 }} />

        <Container>{renderDescription}</Container>
        <Container>
          <PostList posts={posts.slice(0, 7)} />
        </Container>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type PlanCardProps = StackProps & {
  plan: {
    license: string;
    price: number;
    commons: string[];
    options: string[];
    icons: string[];
  };
};

function PlanCard({ plan, sx, ...other }: PlanCardProps) {
  const standardLicense = plan.license === 'Standard';

  const plusLicense = plan.license === 'Plus';

  const renderLines = (
    <>
      <FloatLine vertical sx={{ top: -64, left: 0, height: 'calc(100% + (64px * 2))' }} />
      <FloatLine vertical sx={{ top: -64, right: 0, height: 'calc(100% + (64px * 2))' }} />
      <FloatXIcon sx={{ top: -8, left: -8 }} />
      <FloatXIcon sx={{ top: -8, right: -8 }} />
      <FloatXIcon sx={{ bottom: -8, left: -8 }} />
      <FloatXIcon sx={{ bottom: -8, right: -8 }} />
    </>
  );

  return (
    <Stack
      spacing={5}
      component={MotionViewport}
      sx={{
        px: 6,
        py: 8,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      {plusLicense && renderLines}

      <Stack direction="row" alignItems="center">
        <Stack flexGrow={1}>
          <m.div variants={varFade({ distance: 24 }).inLeft}>
            <Typography variant="h4" component="h6">
              {plan.license}
            </Typography>
          </m.div>

          <m.div variants={varScale({ distance: 24 }).inX}>
            <Box
              sx={{
                width: 32,
                height: 6,
                opacity: 0.24,
                borderRadius: 1,
                bgcolor: 'error.main',
                ...(standardLicense && { bgcolor: 'primary.main' }),
                ...(plusLicense && { bgcolor: 'secondary.main' }),
              }}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade({ distance: 24 }).inLeft}>
          <Box component="span" sx={{ typography: 'h3' }}>
            ${plan.price}
          </Box>
        </m.div>
      </Stack>

      <Stack direction="row" spacing={2}>
        {plan.icons.map((icon, index) => (
          <Box
            component={m.img}
            variants={varFade().in}
            key={icon}
            alt={icon}
            src={icon}
            sx={{
              width: 24,
              height: 24,
              ...(standardLicense && [1, 2].includes(index) && { display: 'none' }),
            }}
          />
        ))}
        {standardLicense && (
          <Box component={m.span} variants={varFade().in} sx={{ ml: -1 }}>
            (only)
          </Box>
        )}
      </Stack>

      <Stack spacing={2.5}>
        {plan.commons.map((option) => (
          <Stack
            key={option}
            component={m.div}
            variants={varFade().in}
            spacing={1.5}
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2' }}
          >
            <Iconify width={16} icon="eva:checkmark-fill" />
            {option}
          </Stack>
        ))}

        <m.div variants={varFade({ distance: 24 }).inLeft}>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </m.div>

        {plan.options.map((option, index) => {
          const disabled =
            (standardLicense && [1, 2, 3].includes(index)) || (plusLicense && [3].includes(index));

          return (
            <Stack
              key={option}
              component={m.div}
              variants={varFade().in}
              spacing={1.5}
              direction="row"
              alignItems="center"
              sx={{
                typography: 'body2',
                ...(disabled && { color: 'text.disabled', textDecoration: 'line-through' }),
              }}
            >
              <Iconify width={18} icon={disabled ? 'mingcute:close-line' : 'eva:checkmark-fill'} />
              {option}
            </Stack>
          );
        })}
      </Stack>

      <m.div variants={varFade({ distance: 24 }).inUp}>
        <Button
          fullWidth
          variant={plusLicense ? 'contained' : 'outlined'}
          color="inherit"
          size="large"
          target="_blank"
          rel="noopener"
          href={paths.minimalStore}
        >
          Get started
        </Button>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const PLANS = [...Array(3)].map((_, index) => ({
  license: ['Standard', 'Plus', 'Extended'][index],
  price: [69, 129, 599][index],
  commons: [
    'One end products',
    '12 months updates',
    '6 months of support',
    'One-time payments',
    'Lifetime perpetual license.',
  ],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design resources (Figma)',
    'Commercial applications',
  ],
  icons: [
    `${CONFIG.site.basePath}/assets/icons/platforms/ic-js.svg`,
    `${CONFIG.site.basePath}/assets/icons/platforms/ic-ts.svg`,
    `${CONFIG.site.basePath}/assets/icons/platforms/ic-figma.svg`,
  ],
}));
