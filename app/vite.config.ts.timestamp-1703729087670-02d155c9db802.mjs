// vite.config.ts
import solid from "file:///Users/jasoncheung/Desktop/code/clubsneu/app/node_modules/solid-start/vite/plugin.js";
import { defineConfig } from "file:///Users/jasoncheung/Desktop/code/clubsneu/app/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///Users/jasoncheung/Desktop/code/clubsneu/app/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import suidPlugin from "file:///Users/jasoncheung/Desktop/code/clubsneu/app/node_modules/@suid/vite-plugin/index.mjs";
import vercel from "file:///Users/jasoncheung/Desktop/code/clubsneu/app/node_modules/solid-start-vercel/index.js";
var vite_config_default = defineConfig({
  plugins: [
    solid({
      ssr: false,
      // currently disabled for hydration mismatch error when using SVGs
      adapter: vercel()
    }),
    suidPlugin(),
    solidPlugin()
  ],
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamFzb25jaGV1bmcvRGVza3RvcC9jb2RlL2NsdWJzbmV1L2FwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2phc29uY2hldW5nL0Rlc2t0b3AvY29kZS9jbHVic25ldS9hcHAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2phc29uY2hldW5nL0Rlc2t0b3AvY29kZS9jbHVic25ldS9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgc29saWQgZnJvbSAnc29saWQtc3RhcnQvdml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCc7XG5pbXBvcnQgc3VpZFBsdWdpbiBmcm9tICdAc3VpZC92aXRlLXBsdWdpbic7XG5pbXBvcnQgdmVyY2VsIGZyb20gJ3NvbGlkLXN0YXJ0LXZlcmNlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBzb2xpZCh7XG4gICAgICBzc3I6IGZhbHNlLCAvLyBjdXJyZW50bHkgZGlzYWJsZWQgZm9yIGh5ZHJhdGlvbiBtaXNtYXRjaCBlcnJvciB3aGVuIHVzaW5nIFNWR3NcbiAgICAgIGFkYXB0ZXI6IHZlcmNlbCgpXG4gICAgfSksXG4gICAgc3VpZFBsdWdpbigpLFxuICAgIHNvbGlkUGx1Z2luKClcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxPQUFPLFdBQVc7QUFDeFUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxZQUFZO0FBRW5CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLEtBQUs7QUFBQTtBQUFBLE1BQ0wsU0FBUyxPQUFPO0FBQUEsSUFDbEIsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K