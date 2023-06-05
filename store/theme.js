import { onMounted } from "vue";
import { defineStore } from "pinia";
import { useVuetify } from "@/plugins/vuetify";
import { useStorage } from "@vueuse/core";

export const useThemeStore = defineStore("themeStore", () => {
  const dark = useStorage('theme-dark', false);
  const vuetify = useVuetify();

  onMounted(() => {
    console.log(dark.value);
  });

  function setThemeDark(theme) {
    dark.value = theme;
    vuetify.theme.dark = theme;
  }

  function getThemeDark() {
    return dark.value;
  }

  return { dark, setThemeDark, getThemeDark };
});
