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
  devServer: {
    port: 3005,
    server: 'http',
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  modules: ["@pinia/nuxt"],
});
