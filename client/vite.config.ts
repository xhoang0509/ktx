import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@constants": path.resolve(__dirname, "src/constants"),
            "@features": path.resolve(__dirname, "src/features"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@app": path.resolve(__dirname, "src/app"),
            "@layouts": path.resolve(__dirname, "src/layouts"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@config": path.resolve(__dirname, "src/config"),
            "@services": path.resolve(__dirname, "src/services"),
        },
    },
});
