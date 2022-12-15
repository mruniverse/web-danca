import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
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
      dark:{
        secondary: colors.grey.lighten2,
        accent: colors.grey.darken2,
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        background: "#121212",
        defaultBtn: "#363636",
        defaultSheet: "#363636",
      }
    },
    options: { customProperties: true },
  },
});
