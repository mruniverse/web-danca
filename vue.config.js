const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 3000,
    server: 'http',
    headers: { "Access-Control-Allow-Origin": "*" }
  },
})
