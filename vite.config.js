import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    compatConfig: {
                        MODE: 2,
                    },
                },
            },
        }),
    ],
    resolve: {
        alias: {
            vue: "@vue/compat",
        },
    },
    build: {
        outDir: "dist",
    },
    server: {
        host: true,
        open: true,
    },
});
