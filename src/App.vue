<script setup>
</script>

<template>
  <v-app id="app">
    <header>
      <!-- <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    </header>
    <body>
      <router-view></router-view>
    </body>
  </v-app>
</template>

<style scoped>
/* Align all body content to center */
body {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E5E5E5;
}
</style>
