import { ref } from "vue";
import { defineStore } from "pinia";
import nuxtStorage from 'nuxt-storage';
import { useVuetify } from "@/plugins/vuetify";

export const useThemeStore = defineStore("themeStore", () => {
  const dark = ref(false);
  const vuetify = useVuetify();

  function setThemeDark(theme) {
    dark.value = theme;
    vuetify.theme.dark = theme;
    nuxtStorage.localStorage.setData("themeDark", JSON.stringify(theme));
  }

  function getThemeDark() {
    let value = nuxtStorage.localStorage.getData("themeDark");
    if(value !== null) {
      dark.value = value;
      return dark.value;
    }
  }

  return { dark, setThemeDark, getThemeDark };
});
