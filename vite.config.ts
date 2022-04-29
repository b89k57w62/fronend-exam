import reactRefresh from "@vitejs/plugin-react-refresh"
import { defineConfig } from "vite"
import vitePluginImp from "vite-plugin-imp"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  server: {
    proxy: {
      "^/api": {
        target: "http://localhost:3110/",
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
