import { ref } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", () => {
  const dark = ref(true);

  function setThemeDark(theme) {
    dark.value = theme;
    this.$vuetify.theme.dark = theme;
    localStorage.setItem("themeDark", JSON.stringify(theme));
  }

  function getThemeDark() {
    let value = JSON.parse(localStorage.getItem("themeDark"));
    if(value !== null) {
      dark.value = value;
      return dark.value;
    }
  }

  return { dark, setThemeDark, getThemeDark };
});
