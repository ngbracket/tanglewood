/// <reference types="vitest" />

import analog from "@analogjs/platform";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    publicDir: "src/public",

    build: {
      outDir: "../dist/./blog/client",
      reportCompressedSize: true,
      commonjsOptions: { transformMixedEsModules: true },
      target: ["es2020"],
    },
    plugins: [
      analog({
        vite: {
          inlineStylesExtension: "scss",
        },
      }),

      nxViteTsPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
