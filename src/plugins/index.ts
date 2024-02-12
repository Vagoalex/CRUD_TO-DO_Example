/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from "@/plugins/vuetify/webfontloader";
import vuetify from "@/plugins/vuetify";
import { pinia } from "@/plugins/pinia";
import router from "@/router";
import { i18n } from "@/plugins/i18n";

// Types
import type { App } from "vue";

export async function registerPlugins(app: App) {
	await loadFonts();
	app.use(vuetify)
	   .use(router)
	   .use(pinia)
	   .use(i18n);
}
