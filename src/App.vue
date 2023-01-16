<template>
  <v-app class="main">
    <router-view />
  </v-app>
</template>

<script>
import { useThemeStore } from '@/store/theme';
import { computed, onMounted, provide, reactive } from 'vue';
import vuetify from './plugins/vuetify';

export default {
  name: 'App',
  setup(props, context) {
    const themeStore = useThemeStore();
    const toast = reactive({
      notify: computed({
        get() {
          return this.$toast;
        }
      })
    });

    provide('toast', toast.notify);
    onMounted(() => {
      vuetify.framework.theme.isDark = themeStore.getThemeDark();
    });

    return {};
  },
}

</script>

<style lang="scss">
@import '@/assets/main.scss';
</style>
