// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import { resolve, dirname } from "node:path";


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VueI18nPlugin({
			runtimeOnly: false,
			include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/plugins/i18n/locales/**")
		}),
		// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
		vuetify({
			autoImport: true
		})
	],
	
	resolve: {
		alias: [
			{ find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
			{ find: "@styles", replacement: fileURLToPath(new URL("./src/styles", import.meta.url)) }
		],
		extensions: [
			".js",
			".json",
			".jsx",
			".mjs",
			".ts",
			".tsx",
			".vue"
		]
	},
	server: {
		host: "127.0.0.1",
		port: 8000
	}
});
