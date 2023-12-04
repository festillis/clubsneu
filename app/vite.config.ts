import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from '@suid/vite-plugin';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  plugins: [
    solid({
      ssr: false // currently disabled for hydration mismatch error when using SVGs
    }),
    suidPlugin(),
    solidPlugin(),
    solidSvg()
  ],
  build: {
    target: 'esnext'
  }
});
