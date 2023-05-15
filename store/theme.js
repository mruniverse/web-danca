import { ref } from "vue";
import { defineStore } from "pinia";
import vuetify from "@/plugins/vuetify";

export const useThemeStore = defineStore("themeStore", () => {
  const dark = ref(true);

  function setThemeDark(theme) {
    dark.value = theme;
    vuetify.framework.theme.dark = theme;
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
