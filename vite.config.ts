import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: "structure/index.ts",
      name: "mdu-ds",
      fileName: (format) => `mdu-ds.${format}.js`,
    },
  },
});
