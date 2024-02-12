import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "vuetify/styles";
import "@styles/main.scss";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { darkThemeColors } from "@/plugins/vuetify/themes/dark";
import { lightThemeColors } from "@/plugins/vuetify/themes/light";

export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "dark",
		themes: {
			dark: {
				colors: {
					...darkThemeColors
				}
			},
			light: {
				colors: {
					...lightThemeColors
				}
			}
		}
	}
});
