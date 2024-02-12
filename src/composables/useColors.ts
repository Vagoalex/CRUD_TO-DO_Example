import vuetifyColors from "vuetify/lib/util/colors";
import { useTheme } from "vuetify";
import { ThemeInstance } from "vuetify";

export function useColors() {
	const { current } = useTheme();
	const currentThemeColors = current.value.colors;
	
	const colors: Record<string, ThemeInstance | string | any> = {
		...vuetifyColors,
		...currentThemeColors
	};
	
	return {
		colors
	};
}
