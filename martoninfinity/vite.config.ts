import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [
        react(),
        svgr(),
    ],
    server: {
        port: 34593,
        proxy: {
            '/api/steam-news': {
                target: 'https://api.steampowered.com',
                changeOrigin: true,
                rewrite: () =>
                    `/ISteamNews/GetNewsForApp/v2/?appid=3065800&count=100&maxlength=1000&format=json`,
                // Development ONLY: Disable caching for the proxy response to ensure fresh data is fetched from the Steam API on each request.
                // headers: { 
                //     'Cache-Control': 'no-cache',
                // },
            },
        },
    }
})