import { onMounted } from "vue";
import { defineStore } from "pinia";
import { useVuetify } from "@/plugins/vuetify";
import { useCookies } from "@/plugins/cookies";

export const useThemeStore = defineStore("themeStore", () => {
  const cookies = useCookies();
  const vuetify = useVuetify();

  onMounted(() => {
    setThemeDark(cookies.get("dark"));
  });

  function setThemeDark(theme) {
    setTimeout(() => {
      vuetify.theme.dark = theme;
      cookies.set("dark", theme);
    }, 1);
  }

  function getThemeDark() {
    return cookies.get("dark");
  }

  return { setThemeDark, getThemeDark };
});
