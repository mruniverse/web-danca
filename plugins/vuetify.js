import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css'
import colors from "vuetify/lib/util/colors";

const lightTheme = {
  dark: false,
  colors: {
    primary: "#2886DA",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
    background: "#f5f6fa",
    textField: "#ffffff",
    defaultBtn: "#ffffff",
    defaultSheet: "#ffffff",
  },
};

const darkTheme = {
  dark: true,
  colors: {
    secondary: "#424242",
    accent: "#424242",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
    background: "#121212",
    defaultBtn: "#363636",
    defaultSheet: "#363636",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: "lightTheme",
      themes: { lightTheme, darkTheme },
      options: { customProperties: true },
    },
    icons: {
      defaultSet: "mdi",
    },
    components,
    directives,
  });

  nuxtApp.vueApp.use(vuetify);
});
