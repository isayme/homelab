import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "yaml-content-type",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith(".yaml")) {
            res.setHeader("Content-Type", "text/plain; charset=utf-8")
          }
          next()
        })
      },
    },
  ],
})
