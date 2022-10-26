<template>
  <v-app class="main">
    <router-view />
  </v-app>
</template>

<script setup>
import { useThemeStore } from '@/store/theme';
import { onMounted } from 'vue';
import vuetify from './plugins/vuetify';
const themeStore = useThemeStore();

onMounted(() => {
  vuetify.framework.theme.isDark = themeStore.getThemeDark();
});
</script>

<style scoped>
@import '@/assets/main.scss';
</style>
