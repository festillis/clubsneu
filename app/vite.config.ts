import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from '@suid/vite-plugin';
import vercel from 'solid-start-vercel';

export default defineConfig({
  plugins: [
    solid({
      ssr: false, // currently disabled for hydration mismatch error when using SVGs
      adapter: vercel()
    }),
    suidPlugin(),
    solidPlugin()
  ],
  build: {
    target: 'esnext'
  }
});
