import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/

export default () => {
    const PORT = '3000';

    return defineConfig({
        plugins: [react()],
        server: {
            port: PORT && Number(PORT),
        },
    });
};
