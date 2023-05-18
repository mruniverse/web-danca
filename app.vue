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
    const toast = reactive({
      notify: computed({
        get() {
          return this.$toast;
        }
      })
    });

    provide('toast', toast.notify);
    provide('api', api);

    onBeforeMount(() => {
      setupTheme();
    });

    function setupTheme() {
      theme.global.name.value = themeStore.getThemeDark();
    }

    async function api(url) {
      const { data, pending, error, refresh } = await useFetch(url, {
        onRequest({ request, options }) {
          options.headers.authorization = `Bearer ${authStore.getAccessToken()}`
        },
        onRequestError({ request, options, error }) {
          // Handle the request errors
        },
        onResponse({ request, response, options }) {
          authStore.setItem('token', response._data.token)
        },
        onResponseError({ request, response, options }) {
          // Handle the response errors
        }
      })
    }

    return {};
  },
}

</script>

<style lang="scss">
@import '~/scss/main.scss';
</style>
