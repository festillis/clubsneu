// @refresh reload
import { Show, Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from 'solid-start';
import './root.css';
import { ThemeProvider } from '@suid/material';
import { theme } from './theme';
import { createMediaQuery } from '@solid-primitives/media';
import { flags } from './constants';

export default function Root() {
  const isDesktopSize = createMediaQuery('(min-width: 1280px)');

  return (
    <ThemeProvider theme={theme}>
      <Html lang="en">
        <Head>
          <Title>ClubsNEU</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body>
          <Show
            when={flags.ENFORCE_DESKTOP_ONLY_SIZE && !isDesktopSize()}
            fallback={
              <ErrorBoundary>
                <Suspense fallback={<div>Loading</div>}>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            }>
            <div>We currently only support desktop size browsers</div>
          </Show>

          <Scripts />
        </Body>
      </Html>
    </ThemeProvider>
  );
}
