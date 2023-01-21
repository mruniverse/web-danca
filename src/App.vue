<template>
  <v-app class="main">
    <router-view />
  </v-app>
</template>

<script>
import { useThemeStore } from '@/store/theme';
import { computed, onBeforeMount, provide, reactive } from 'vue';
import vuetify from './plugins/vuetify';
import api from './plugins/axios';
import { useAuthStore } from './store/auth';

export default {
  name: 'App',
  
  setup() {
    const authStore = useAuthStore();
    const themeStore = useThemeStore();
    const toast = reactive({
      notify: computed({
        get() {
          return this.$toast;
        }
      })
    });

    provide('toast', toast.notify);

    onBeforeMount(() => {
      setupTheme();
      setupAxios();
    });

    function setupTheme(){
      vuetify.framework.theme.isDark = themeStore.getThemeDark();
    }

    function setupAxios(){
      api.defaults.headers.common['Authorization'] = `Bearer ${authStore.getAccessToken()}`;
    }

    return {};
  },
}

</script>

<style lang="scss">
@import '@/assets/main.scss';
</style>
