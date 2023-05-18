import { ref } from "vue";
import { defineStore } from "pinia";
import vuetify from "@/plugins/vuetify";
import nuxtStorage from "nuxt-storage";

export const useThemeStore = defineStore("themeStore", () => {
  const dark = ref(true);

  function setThemeDark(theme) {
    dark.value = theme;
    vuetify.framework.theme.dark = theme;
    nuxtStorage.localStorage.setData("themeDark", JSON.stringify(theme));
  }

  function getThemeDark() {
    let value = JSON.parse(nuxtStorage.localStorage.getData("themeDark"));
    if(value !== null) {
      dark.value = value;
      return dark.value;
    }
  }

  return { dark, setThemeDark, getThemeDark };
});
