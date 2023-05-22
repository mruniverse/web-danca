import { ref } from "vue";
import { defineStore } from "pinia";
import nuxtStorage from 'nuxt-storage';

export const useThemeStore = defineStore("themeStore", () => {
  const dark = ref(true);

  function setThemeDark(theme) {
    dark.value = theme;
    // this.$vuetify.theme.dark = theme;
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
