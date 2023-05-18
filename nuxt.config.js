export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "~/scss/main.scss",
    "~/scss/globalStyles.scss",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@pinia/nuxt"],
});
