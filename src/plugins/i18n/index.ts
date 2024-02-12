import { createI18n } from "vue-i18n";
import pluralRules from "@/plugins/i18n/rules/pluralization";
import numberFormats from "@/plugins/i18n/rules/numbers";
import ru from "@/plugins/i18n/langDir/ru";
import en from "@/plugins/i18n/langDir/en";

export const i18n = createI18n({
	locale: import.meta.env.VITE_DEFAULT_LOCALE,
	fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
	legacy: false,
	globalInjection: true,
	messages: { ru, en },
	runtimeOnly: false,
	pluralRules,
	numberFormats
});
