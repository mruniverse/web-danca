<template>
  <v-app class="main">
    <Nuxt />
  </v-app>
</template>

<script>
import { useThemeStore } from "@/store/theme";
import { onBeforeMount, provide } from "vue";
import api from "@/plugins/axios";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification/composition";
import { useVuetify } from "@/plugins/vuetify";

export default {
  name: "App",

  setup() {
    const authStore = useAuthStore();
    const themeStore = useThemeStore();
    const toast = useToast();
    const vuetify = useVuetify();

    provide("toast", toast);

    onBeforeMount(() => {
      setupTheme();
      setupAxios();
    });

    function setupTheme() {
      vuetify.theme.isDark = themeStore.getThemeDark();
    }

    function setupAxios() {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authStore.getAccessToken()}`;
    }

    return {};
  },
};
</script>

<style lang="scss">
@import "@/assets/main.scss";
</style>
