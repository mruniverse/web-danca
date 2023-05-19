<template>
  <v-app class="main">
    <router-view />
  </v-app>
</template>

<script>
import { useThemeStore } from '@/store/theme';
import { computed, onBeforeMount, provide, reactive } from 'vue';
import { useAuthStore } from './store/auth';
import { useTheme } from 'vuetify'

export default {
  name: 'App',

  setup() {
    const theme = useTheme()
    const authStore = useAuthStore();
    const themeStore = useThemeStore();

    onBeforeMount(() => {
      setupTheme();
    });

    function setupTheme() {
      theme.global.name.value = themeStore.getThemeDark();
    }

    return {};
  },
}

</script>

<style lang="scss">
@import '~/scss/main.scss';
</style>
