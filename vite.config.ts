import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig((configEnv) => {
	const isDevelopment = configEnv.mode === "development";

	return {
		plugins: [react(), EnvironmentPlugin("all")],
		css: {
			modules: {
				generateScopedName: isDevelopment ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:5]",
			},
		},
	};
});
