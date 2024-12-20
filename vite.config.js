/* eslint-disable implicit-arrow-linebreak */
import {defineConfig} from 'vite';
import {FontaineTransform} from 'fontaine';
import {rollupPluginHTML as pluginHtml} from '@web/rollup-plugin-html';
import totalBundlesize from '@blockquote/rollup-plugin-total-bundlesize';
import externalizeSourceDependencies from '@blockquote/rollup-plugin-externalize-source-dependencies';
/**
 * https://vitejs.dev/config/
 * https://vite-rollup-plugins.patak.dev/
 */

export default defineConfig({
  plugins: [
    externalizeSourceDependencies(['/__web-dev-server__web-socket.js']),
    pluginHtml(),
    FontaineTransform.vite({
      fallbacks: ['sans-serif'],
      resolvePath: (id) => new URL(`.${id}`, import.meta.url),
    }),
    totalBundlesize(),
  ],
  build: {
    target: ['chrome71'],
    outDir: 'dev',
    rollupOptions: {
      input: 'demo/*.html',
      output: {
        dir: 'dev/',
        format: 'es',
      },
    },
  },
});
