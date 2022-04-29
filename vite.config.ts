import reactRefresh from "@vitejs/plugin-react-refresh"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  server: {
    proxy: {
      "^/api": {
        target: "http://localhost:3110/",
        changeOrigin: true,
      },
    },
  },
})
