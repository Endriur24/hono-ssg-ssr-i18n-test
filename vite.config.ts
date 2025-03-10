import { defineConfig } from 'vite'
import ssg from '@hono/vite-ssg'
import devServer from '@hono/vite-dev-server'
import pages from '@hono/vite-cloudflare-pages'

const entry = 'src/index.tsx'

export default defineConfig({
    plugins: [devServer({ entry }), pages(), ssg()]
})